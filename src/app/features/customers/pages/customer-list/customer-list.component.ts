import { Component, OnInit } from '@angular/core';
import { CustomerFacade } from '../../state/customer.facade';
import { Customer } from '../../models/customer.model';
import {Observable, tap} from 'rxjs';
import {DialogService} from "../../../../shared/services/dialog.service";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  customers$: Observable<Customer[]>;
  displayedColumns: string[] = ['firstName', 'lastName', 'addresses', 'actions'];

  constructor(private customerFacade: CustomerFacade, private dialogService: DialogService<Customer>) {
    this.customers$ = this.customerFacade.customers$;
  }

  ngOnInit(): void {
    this.customerFacade.loadCustomers();
  }

  deleteCustomer(customer: Customer): void {
    this.dialogService.confirm("Confirm", "Are you sure you want to delete this user?", customer);
  }
}
