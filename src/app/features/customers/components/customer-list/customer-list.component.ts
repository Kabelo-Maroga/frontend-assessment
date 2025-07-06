import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerFacade } from '../../state/customer.facade';
import { Customer } from '../../models/customer.model';
import { BehaviorSubject, combineLatest, map, Observable, takeUntil, filter } from 'rxjs';
import { DialogService } from "../../../../shared";
import { NotificationService } from "../../../../shared";
import { CustomerFormComponent } from "../customer-form/customer-form.component";
import { MatDialog } from '@angular/material/dialog';
import { BaseListComponent } from "../../../../shared";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent extends BaseListComponent implements OnInit {
  displayedColumns = ['firstName', 'lastName', 'addresses', 'actions'];
  filteredCustomers$!: Observable<Customer[]>;
  loading$ = this.customerFacade.loading$;
  selectedCustomer$ = this.customerFacade.selectedCustomer$;

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
    this.setupFiltering();
  }

  openAddCustomerDialog(): void {
    this.openDialog(CustomerFormComponent, {}, 'Customer added successfully');
  }

  editCustomer(customer: Customer): void {
    this.openDialog(
      CustomerFormComponent,
      { data: { customer, isEdit: true } },
      'Customer updated successfully'
    );
  }

  deleteCustomer(customer: Customer): void {
    this.dialogService.confirm({
      message: 'Are you sure you want to delete this customer?',
      entity: customer
    }).pipe(
      filter(Boolean),
      takeUntil(this._ngUnsubscribe)
    ).subscribe(() => {
      this.customerFacade.deleteCustomer(customer.id);
      this.notificationService.success('Customer deleted successfully');
    });
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
    this.router.navigate(['/quotes'], {
      queryParams: { customerId: customer.id }
    });
  }

  private setupFiltering(): void {
    this.filteredCustomers$ = combineLatest([
      this.customerFacade.customers$,
      this.searchSubject$.asObservable()
    ]).pipe(
      map(([customers, searchKey]) =>
        customers.filter(c =>
          this.matchesSearch(c, searchKey)
        )
      )
    );
  }

  private matchesSearch(customer: Customer, searchKey: string): boolean {
    if (!searchKey) return true;
    const searchLower = searchKey.toLowerCase();
    return customer.firstName.toLowerCase().includes(searchLower) ||
           customer.lastName.toLowerCase().includes(searchLower);
  }
}
