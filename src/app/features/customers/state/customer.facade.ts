import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CustomerState } from './customer.reducer';
import * as CustomerActions from './customer.actions';
import * as CustomerSelectors from './customer.selectors';
import { Customer } from '../models/customer.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustomerFacade {
  customers$: Observable<Customer[]> = this.store.select(CustomerSelectors.selectAllCustomers);
  loading$: Observable<boolean> = this.store.select(CustomerSelectors.selectLoading);

  constructor(private store: Store<CustomerState>) {}

  loadCustomers() {
    this.store.dispatch(CustomerActions.loadCustomers());
  }

  addCustomer(customer: Customer) {
    this.store.dispatch(CustomerActions.addCustomer({ customer }));
  }

  updateCustomer(customer: Customer) {
    this.store.dispatch(CustomerActions.updateCustomer({ customer }));
  }

  deleteCustomer(customerId: string) {
    this.store.dispatch(CustomerActions.deleteCustomer({ customerId }));
  }
}
