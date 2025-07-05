import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomerState } from './customer.reducer';

export const selectCustomerState = createFeatureSelector<CustomerState>('customers');

export const selectAllCustomers = createSelector(
  selectCustomerState,
  (state: CustomerState) => state.customers
);

export const selectLoading = createSelector(
  selectCustomerState,
  (state: CustomerState) => state.loading
);

export const selectError = createSelector(
  selectCustomerState,
  (state: CustomerState) => state.error
);
