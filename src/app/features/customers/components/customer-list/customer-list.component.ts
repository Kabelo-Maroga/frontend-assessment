import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerFacade } from '../../state/customer.facade';
import { Customer } from '../../models/customer.model';
import { BehaviorSubject, combineLatest, map, Observable, takeUntil, filter } from 'rxjs';
import {
  DialogService,
  ConfirmMessages,
  TableColumns,
  SafeUnsubscribe,
  GridUtils
} from "../../../../shared";
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerFormComponent } from "../customer-form/customer-form.component";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent extends SafeUnsubscribe implements OnInit, AfterViewInit {
  readonly displayedColumns = [
    TableColumns.CUSTOMER.FIRST_NAME,
    TableColumns.CUSTOMER.LAST_NAME,
    TableColumns.CUSTOMER.ADDRESSES,
    TableColumns.CUSTOMER.ACTIONS
  ];
  readonly loading$ = this.customerFacade.loading$;
  readonly selectedCustomer$ = this.customerFacade.selectedCustomer$;
  filteredCustomers$?: Observable<Customer[]>;
  dataSource = new MatTableDataSource<Customer>([]);

  @ViewChild(MatSort) sort!: MatSort;

  private searchSubject$ = new BehaviorSubject<string>('');

  constructor(
    private customerFacade: CustomerFacade,
    private dialogService: DialogService,
    private router: Router,
    private dialog: MatDialog,
  ) {
    super();
  }

  ngOnInit(): void {
    this.customerFacade.loadCustomers();
    this.filteredCustomers$ = this.initFilteredCustomers$();

    GridUtils.subscribeToDataSource(
      this.dataSource,
      this.filteredCustomers$,
      this._ngUnsubscribe
    );
  }

  ngAfterViewInit(): void {
    GridUtils.setupSort(
      this.dataSource,
      this.sort,
      TableColumns.CUSTOMER.LAST_NAME,
      'asc'
    );
  }

  openAddCustomerDialog(): void {
    this.dialog.open(CustomerFormComponent, {});
  }

  editCustomer(customer: Customer): void {
    const dialogConfig = { data: { customer, isEdit: true } };
    this.dialog.open(CustomerFormComponent, dialogConfig);
  }

  deleteCustomer(customer: Customer): void {
    this.showDeleteConfirmation(customer).pipe(
      filter(Boolean),
      takeUntil(this._ngUnsubscribe)
    ).subscribe(() => this.handleCustomerDeletion(customer));
  }

  onSearch(value: string): void {
    this.searchSubject$.next(value);
  }

  onRowClick(customer: Customer): void {
    this.customerFacade.selectedCustomer(customer);
  }

  onCloseDetails(): void {
    this.customerFacade.selectedCustomer(undefined);
  }

  viewCustomerQuotes(customer: Customer): void {
    this.navigateToQuotes(customer.id);
  }

  private showDeleteConfirmation(customer: Customer): Observable<boolean> {
    return this.dialogService.confirm({
      message: ConfirmMessages.DELETE_CUSTOMER,
      entity: customer
    });
  }

  private handleCustomerDeletion(customer: Customer): void {
    this.customerFacade.deleteCustomer(customer.id);
  }

  private navigateToQuotes(customerId: string): void {
    this.router.navigate(['/quotes'], {
      queryParams: { customerId }
    });
  }

  private initFilteredCustomers$(): Observable<Customer[]> {
    return combineLatest([
      this.customerFacade.customers$,
      this.searchSubject$.asObservable()
    ]).pipe(
      map(([customers, searchKey]) => this.filterCustomers(customers, searchKey))
    );
  }

  private filterCustomers(customers: Customer[], searchKey: string): Customer[] {
    return customers.filter(customer => this.matchesSearch(customer, searchKey));
  }

  private matchesSearch(customer: Customer, searchKey: string): boolean {
    if (!searchKey) return true;
    const searchLower = searchKey.toLowerCase();
    return this.isMatchingName(customer.firstName, searchLower) ||
      this.isMatchingName(customer.lastName, searchLower);
  }

  private isMatchingName(name: string, searchKey: string): boolean {
    return name.toLowerCase().includes(searchKey);
  }
}
