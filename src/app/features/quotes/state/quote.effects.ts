import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { QuoteService } from '../services/quote.service';
import * as QuoteActions from './quote.actions';
import { catchError, map, mergeMap, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectQuotesWithCustomers } from './quote.selectors';
import { NotificationService, SuccessMessages } from '../../../shared';

@Injectable()
export class QuoteEffects {
  constructor(
    private actions$: Actions,
    private quoteService: QuoteService,
    private store: Store,
    private notificationService: NotificationService
  ) {}

  loadQuotesWithCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuoteActions.loadQuotes),
      withLatestFrom(this.store.select(selectQuotesWithCustomers)),
      switchMap(([_, quotesWithCustomers]) => {
        // If there are already quotes in the store, don't fetch them again
        if (quotesWithCustomers && quotesWithCustomers.length > 0) {
          return of(QuoteActions.loadQuotesSuccess({ quotesWithCustomers }));
        }

        // Otherwise, fetch from server
        return this.quoteService.getQuotesWithCustomers().pipe(
          map((quotesWithCustomers) => QuoteActions.loadQuotesSuccess({ quotesWithCustomers })),
          catchError((error) => of(QuoteActions.loadQuotesFailure({ error })))
        );
      })
    )
  );

  addQuote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuoteActions.addQuote),
      switchMap(({ quoteWithCustomer }) =>
        this.quoteService.addQuote(quoteWithCustomer).pipe(
          map((newQuote) => QuoteActions.addQuoteSuccess({ quoteWithCustomer: newQuote })),
          catchError((error) => of(QuoteActions.addQuoteFailure({ error })))
        )
      )
    )
  );

  addQuoteSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuoteActions.addQuoteSuccess),
      tap(() => this.notificationService.success(SuccessMessages.QUOTE_ADDED))
    ),
    { dispatch: false }
  );

  updateQuote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuoteActions.updateQuote),
      switchMap(({ quoteWithCustomer }) =>
        this.quoteService.updateQuote(quoteWithCustomer).pipe(
          map((updatedQuote) => QuoteActions.updateQuoteSuccess({ quoteWithCustomer: updatedQuote })),
          catchError((error) => of(QuoteActions.updateQuoteFailure({ error })))
        )
      )
    )
  );

  updateQuoteSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuoteActions.updateQuoteSuccess),
      tap(() => this.notificationService.success(SuccessMessages.QUOTE_UPDATED))
    ),
    { dispatch: false }
  );

  deleteQuote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuoteActions.deleteQuote),
      switchMap(({ id }) =>
        this.quoteService.deleteQuote(id).pipe(
          map((deletedId) => QuoteActions.deleteQuoteSuccess({ id: deletedId })),
          catchError((error) => of(QuoteActions.deleteQuoteFailure({ error })))
        )
      )
    )
  );

  deleteQuoteSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuoteActions.deleteQuoteSuccess),
      tap(() => this.notificationService.success(SuccessMessages.QUOTE_DELETED))
    ),
    { dispatch: false }
  );
}
