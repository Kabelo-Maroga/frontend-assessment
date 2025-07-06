import { createReducer, on } from '@ngrx/store';
import { Customer } from '../models/customer.model';
import * as CustomerActions from './customer.actions';
import {selectedCustomer} from "./customer.selectors";

export interface CustomerState {
  selectedCustomer: Customer | undefined;
  customers: Customer[];
  loading: boolean;
}

export const initialState: CustomerState = {
  selectedCustomer: undefined,
  customers: [],
  loading: false,
};

export const customerReducer = createReducer(
  initialState,
  on(CustomerActions.loadCustomers, state => ({
    ...state, loading: true
  })),

  on(CustomerActions.loadCustomersSuccess, (state, { customers }) => ({
    ...state, loading: false, customers
  })),

  on(CustomerActions.addCustomerSuccess, (state, { customer }) => ({
    ...state,
    customers: [...state.customers, customer]
  })),

  on(CustomerActions.updateCustomerSuccess, (state, { customer }) => ({
    ...state,
    selectedCustomer: getCustomer(state, customer),
    customers: state.customers.map(c => c.id === customer.id ? customer : c)
  })),

  on(CustomerActions.deleteCustomerSuccess, (state, { customerId }) => ({
    ...state,
    customers: state.customers.filter(c => c.id !== customerId)
  })),

  on(CustomerActions.selectCustomer, (state, { selectedCustomer }) => ({
    ...state,
    selectedCustomer
  }))
);

/**
 * if customer is already selected, update selectedCustomer slice of the state as well.
 * @param state
 * @param customer
 */
function getCustomer(state: CustomerState, customer: Customer): Customer | undefined {
  return state.selectedCustomer ? customer : undefined;
}

