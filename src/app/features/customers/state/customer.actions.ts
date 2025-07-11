import { createAction, props } from '@ngrx/store';
import { Customer } from '../models/customer.model';

export const loadCustomers = createAction('[Customer] Load Customers');
export const loadCustomersSuccess = createAction('[Customer] Load Customers Success', props<{ customers: Customer[] }>());
export const loadCustomersFailure = createAction('[Customer] Load Customers Failure', props<{ error: any }>());

export const addCustomer = createAction('[Customer] Add Customer', props<{ customer: Customer }>());
export const addCustomerSuccess = createAction('[Customer] Add Customer Success', props<{ customer: Customer }>());
export const addCustomerFailure = createAction('[Customer] Add Customer Failure', props<{ error: any }>());

export const updateCustomer = createAction('[Customer] Update Customer', props<{ customer: Customer }>());
export const updateCustomerSuccess = createAction('[Customer] Update Customer Success', props<{ customer: Customer }>());
export const updateCustomerFailure = createAction('[Customer] Update Customer Failure', props<{ error: any }>());

export const deleteCustomer = createAction('[Customer] Delete Customer', props<{ customerId: string }>());
export const deleteCustomerSuccess = createAction('[Customer] Delete Customer Success', props<{ customerId: string }>());
export const deleteCustomerFailure = createAction('[Customer] Delete Customer Failure', props<{ error: any }>());

export const selectCustomer = createAction('[Customer] Select Customer', props<{ selectedCustomer: Customer | undefined }>());
