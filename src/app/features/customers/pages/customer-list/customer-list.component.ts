import { Component, OnInit } from '@angular/core';
import { CustomerFacade } from '../../state/customer.facade';
import { Customer } from '../../models/customer.model';
import {Observable, tap} from 'rxjs';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  customers$: Observable<Customer[]>;
  displayedColumns: string[] = ['firstName', 'lastName', 'addresses'];

  constructor(private customerFacade: CustomerFacade) {
    this.customers$ = this.customerFacade.customers$;
    this.customerFacade.customers$.pipe(tap(res => console.log("res --- ", res))).subscribe();
  }

  ngOnInit(): void {
    this.customerFacade.loadCustomers();
  }
}
