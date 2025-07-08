import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerFacade } from '../../state/customer.facade';
import { Customer } from '../../models/customer.model';
import { BehaviorSubject, combineLatest, map, Observable, takeUntil, filter } from 'rxjs';
import { 
  BaseListComponent,
  DialogService, 
  NotificationService, 
  SuccessMessages, 
  ConfirmMessages,
  TableColumns,
  RouteParams,
  DialogConfig
} from "../../../../shared";
import { CustomerFormComponent } from "../customer-form/customer-form.component";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent extends BaseListComponent implements OnInit {
  readonly displayedColumns = [
    TableColumns.CUSTOMER.FIRST_NAME,
    TableColumns.CUSTOMER.LAST_NAME,
    TableColumns.CUSTOMER.ADDRESSES,
    TableColumns.CUSTOMER.ACTIONS
  ];
  readonly loading$ = this.customerFacade.loading$;
  readonly selectedCustomer$ = this.customerFacade.selectedCustomer$;
  filteredCustomers$!: Observable<Customer[]>;

  private searchSubject$ = new BehaviorSubject<string>('');

  constructor(
    private customerFacade: CustomerFacade,
    private dialogService: DialogService,
    private router: Router,
    dialog: MatDialog,
    notificationService: NotificationService
  ) {
    super(dialog, notificationService);
  }

  ngOnInit(): void {
    this.customerFacade.loadCustomers();
    this.filteredCustomers$ = this.initFilteredCustomers$();
  }

  openAddCustomerDialog(): void {
    this.openDialog(CustomerFormComponent, {}, SuccessMessages.CUSTOMER_ADDED);
  }

  editCustomer(customer: Customer): void {
    const dialogConfig = { customer, isEdit: true };
    this.openDialog(CustomerFormComponent, dialogConfig, SuccessMessages.CUSTOMER_UPDATED);
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
    this.notificationService.success(SuccessMessages.CUSTOMER_DELETED);//I need to move notifications into the effects later.
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
