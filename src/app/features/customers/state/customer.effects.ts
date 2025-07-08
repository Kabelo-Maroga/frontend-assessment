import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CustomerService } from '../services/customer.service';
import * as CustomerActions from './customer.actions';
import { catchError, map, of, withLatestFrom, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllCustomers } from './customer.selectors';
import { NotificationService, SuccessMessages } from '../../../shared';

@Injectable()
export class CustomerEffects {
  constructor(
    private actions$: Actions,
    private customerService: CustomerService,
    private store: Store,
    private notificationService: NotificationService
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

        // Otherwise, fetch from servr
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
      switchMap(action =>
        this.customerService.addCustomer(action.customer).pipe(
          map(customer => CustomerActions.addCustomerSuccess({ customer })),
          catchError(error => of(CustomerActions.addCustomerFailure({ error })))
        )
      )
    )
  );

  addCustomerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.addCustomerSuccess),
      tap(() => this.notificationService.success(SuccessMessages.CUSTOMER_ADDED))
    ),
    { dispatch: false }
  );

  updateCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.updateCustomer),
      switchMap(action =>
        this.customerService.updateCustomer(action.customer).pipe(
          map(customer => CustomerActions.updateCustomerSuccess({ customer })),
          catchError(error => of(CustomerActions.updateCustomerFailure({ error })))
        )
      )
    )
  );

  updateCustomerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.updateCustomerSuccess),
      tap(() => this.notificationService.success(SuccessMessages.CUSTOMER_UPDATED))
    ),
    { dispatch: false }
  );

  deleteCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.deleteCustomer),
      switchMap(action =>
        this.customerService.deleteCustomer(action.customerId).pipe(
          map(() => CustomerActions.deleteCustomerSuccess({ customerId: action.customerId })),
          catchError(error => of(CustomerActions.deleteCustomerFailure({ error })))
        )
      )
    )
  );

  deleteCustomerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.deleteCustomerSuccess),
      tap(() => this.notificationService.success(SuccessMessages.CUSTOMER_DELETED))
    ),
    { dispatch: false }
  );
}
