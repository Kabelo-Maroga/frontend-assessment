import {Component, OnInit} from '@angular/core';
import {CustomerFacade} from '../../state/customer.facade';
import {Customer} from '../../models/customer.model';
import {BehaviorSubject, combineLatest, debounceTime, map, Observable, startWith} from 'rxjs';
import {DialogService} from "../../../../shared/services/dialog.service";
import {MatDialog} from "@angular/material/dialog";
import {CustomerFormComponent} from "../customer-form/customer-form.component";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'addresses', 'actions'];
  filteredCustomers$: Observable<Customer[]>;

  private searchSubject = new BehaviorSubject<string>('');

  constructor(private customerFacade: CustomerFacade,
              private dialogService: DialogService<Customer>,
              private dialog: MatDialog) {
    this.filteredCustomers$ = combineLatest([
      this.customerFacade.customers$,
      this.searchSubject.asObservable().pipe(startWith(''))])
      .pipe(
        debounceTime(200),
        map(([customers, search]) =>
        customers.filter(c => c.firstName.toLowerCase().includes(search.toLowerCase())))
    );
  }

  ngOnInit(): void {
    this.customerFacade.loadCustomers();
  }

  openAddCustomerDialog(): void {
    this.dialog.open(CustomerFormComponent);
  }

  deleteCustomer(customer: Customer): void {
    this.dialogService.confirm("Confirm", "Are you sure you want to delete this user?", customer);
  }


  onSearch(value: string): void {
    this.searchSubject.next(value);
  }
}
