import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CustomerService } from '../services/customer.service';
import * as CustomerActions from './customer.actions';
import { catchError, map, mergeMap, of, withLatestFrom, filter, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllCustomers } from './customer.selectors';

@Injectable()
export class CustomerEffects {
  constructor(
    private actions$: Actions,
    private customerService: CustomerService,
    private store: Store
  ) {}

  loadCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.loadCustomers),
      withLatestFrom(this.store.select(selectAllCustomers)),
      switchMap(([_, customers]) => {
        // If there are already customers in the store, don't fetch them again
        if (customers && customers.length > 0) {
          return of(CustomerActions.loadCustomersSuccess({ customers }));
        }

        // Otherwise, fetch from service
        return this.customerService.getCustomers().pipe(
          map(customers => CustomerActions.loadCustomersSuccess({ customers })),
          catchError(error => of(CustomerActions.loadCustomersFailure({ error })))
        );
      })
    )
  );

  addCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.addCustomer),
      mergeMap(action =>
        this.customerService.addCustomer(action.customer).pipe(
          map(customer => CustomerActions.addCustomerSuccess({ customer })),
          catchError(error => of(CustomerActions.addCustomerFailure({ error })))
        )
      )
    )
  );

  updateCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.updateCustomer),
      mergeMap(action =>
        this.customerService.updateCustomer(action.customer).pipe(
          map(customer => CustomerActions.updateCustomerSuccess({ customer })),
          catchError(error => of(CustomerActions.updateCustomerFailure({ error })))
        )
      )
    )
  );

  deleteCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.deleteCustomer),
      mergeMap(action =>
        this.customerService.deleteCustomer(action.customerId).pipe(
          map(() => CustomerActions.deleteCustomerSuccess({ customerId: action.customerId })),
          catchError(error => of(CustomerActions.deleteCustomerFailure({ error })))
        )
      )
    )
  );
}
