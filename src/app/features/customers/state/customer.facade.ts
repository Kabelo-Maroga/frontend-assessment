import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CustomerState } from './customer.reducer';
import * as CustomerActions from './customer.actions';
import * as CustomerSelectors from './customer.selectors';
import { Customer } from '../models/customer.model';

@Injectable({ providedIn: 'root' })
export class CustomerFacade {
  customers$ = this.store.select(CustomerSelectors.selectAllCustomers);
  loading$= this.store.select(CustomerSelectors.selectLoading);
  selectedCustomer$ = this.store.select(CustomerSelectors.selectedCustomer);

  constructor(private store: Store<CustomerState>) {}

  loadCustomers(): void {
    this.store.dispatch(CustomerActions.loadCustomers());
  }

  addCustomer(customer: Customer): void {
    this.store.dispatch(CustomerActions.addCustomer({ customer }));
  }

  selectedCustomer(selectedCustomer: Customer | undefined): void {
    this.store.dispatch(CustomerActions.selectCustomer({ selectedCustomer }));
  }

  updateCustomer(customer: Customer): void {
    this.store.dispatch(CustomerActions.updateCustomer({ customer }));
  }

  deleteCustomer(customerId: string): void {
    this.store.dispatch(CustomerActions.deleteCustomer({ customerId }));
  }
}
