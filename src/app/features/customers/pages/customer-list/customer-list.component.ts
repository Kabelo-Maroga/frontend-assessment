import { Component, OnInit } from '@angular/core';
import { CustomerFacade } from '../../state/customer.facade';
import { Customer } from '../../models/customer.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  customers$: Observable<Customer[]>;
  displayedColumns: string[] = ['fullName', 'email', 'phone'];

  constructor(private customerFacade: CustomerFacade) {
    this.customers$ = this.customerFacade.customers$;
  }

  ngOnInit(): void {
    this.customerFacade.loadCustomers();
  }
}
