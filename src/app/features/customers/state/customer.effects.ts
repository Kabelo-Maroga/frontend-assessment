import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CustomerService } from '../services/customer.service';
import * as CustomerActions from './customer.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class CustomerEffects {
  constructor(private actions$: Actions, private customerService: CustomerService) {}

  loadCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.loadCustomers),
      mergeMap(() =>
        this.customerService.getCustomers().pipe(
          map(customers => CustomerActions.loadCustomersSuccess({ customers })),
          catchError(error => of(CustomerActions.loadCustomersFailure({ error })))
        )
      )
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
