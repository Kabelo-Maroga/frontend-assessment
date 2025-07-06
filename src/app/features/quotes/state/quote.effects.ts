import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { QuoteService } from '../services/quote.service';
import * as QuoteActions from './quote.actions';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';

@Injectable()
export class QuoteEffects {
  constructor(private actions$: Actions, private quoteService: QuoteService) {}

  loadQuotesWithCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuoteActions.loadQuotes),
      mergeMap(() =>
        this.quoteService.getQuotesWithCustomers().pipe(
          map((quotesWithCustomers) => QuoteActions.loadQuotesSuccess({ quotesWithCustomers })),
          catchError((error) => of(QuoteActions.loadQuotesFailure({ error })))
        )
      )
    )
  );

  addQuote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuoteActions.addQuote),
      mergeMap(({ quoteWithCustomer }) =>
        this.quoteService.addQuote(quoteWithCustomer).pipe(
          map((newQuote) => QuoteActions.addQuoteSuccess({ quoteWithCustomer: newQuote })),
          catchError((error) => of(QuoteActions.addQuoteFailure({ error })))
        )
      )
    )
  );

  updateQuote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuoteActions.updateQuote),
      mergeMap(({ quoteWithCustomer }) =>
        this.quoteService.updateQuote(quoteWithCustomer).pipe(
          map((updatedQuote) => QuoteActions.updateQuoteSuccess({ quoteWithCustomer: updatedQuote })),
          catchError((error) => of(QuoteActions.updateQuoteFailure({ error })))
        )
      )
    )
  );

  deleteQuote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuoteActions.deleteQuote),
      mergeMap(({ id }) =>
        this.quoteService.deleteQuote(id).pipe(
          map((deletedId) => QuoteActions.deleteQuoteSuccess({ id: deletedId })),
          catchError((error) => of(QuoteActions.deleteQuoteFailure({ error })))
        )
      )
    )
  );
}
