import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerFacade } from '../../state/customer.facade';
import { Customer } from '../../models/customer.model';
import { BehaviorSubject, combineLatest, debounceTime, map, Observable, startWith, Subject, takeUntil, filter } from 'rxjs';
import { DialogService } from "../../../../shared";
import { NotificationService } from "../../../../shared";
import { CustomerFormComponent } from "../customer-form/customer-form.component";
import { MatDialog } from '@angular/material/dialog';
import {SafeUnsubscribe} from "../../../../shared/services/safe-unsubscribe";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent extends SafeUnsubscribe implements OnInit {
  displayedColumns= ['firstName', 'lastName', 'addresses', 'actions'];
  filteredCustomers$?: Observable<Customer[]>;
  loading$ = this.customerFacade.loading$;
  selectedCustomer$ = this.customerFacade.selectedCustomer$;

  private searchSubject$ = new BehaviorSubject<string>('');

  constructor(
    private customerFacade: CustomerFacade,
    private dialogService: DialogService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    this.customerFacade.loadCustomers();
    this.filterCustomers();
  }

  openAddCustomerDialog(): void {
    const dialogRef = this.dialog.open(CustomerFormComponent);

    dialogRef.afterClosed()
      .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe(() => {
        this.notificationService.success('Customer added successfully');
      });
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

  private filterCustomers(): void {
    this.filteredCustomers$ = combineLatest([this.customerFacade.customers$, this.searchSubject$.asObservable()])
      .pipe(
        debounceTime(300),
        map(([customers, searchKey]) =>
          customers.filter(c => c.firstName.toLowerCase().includes(searchKey.toLowerCase()) ||
            c.lastName.toLowerCase().includes(searchKey.toLowerCase())
          )
        )
      );
  }
}
