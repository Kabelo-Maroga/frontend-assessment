import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { QuoteService } from '../services/quote.service';
import * as QuoteActions from './quote.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class QuoteEffects {
  constructor(private actions$: Actions, private quoteService: QuoteService) {}

  loadQuotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuoteActions.loadQuotes),
      mergeMap(() =>
        this.quoteService.getQuotes().pipe(
          map((quotes) => QuoteActions.loadQuotesSuccess({ quotes })),
          catchError((error) => of(QuoteActions.loadQuotesFailure({ error })))
        )
      )
    )
  );

  loadQuotesWithCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuoteActions.loadQuotesWithCustomers),
      mergeMap(() =>
        this.quoteService.getQuotesWithCustomers().pipe(
          map((quotesWithCustomers) => QuoteActions.loadQuotesWithCustomersSuccess({ quotesWithCustomers })),
          catchError((error) => of(QuoteActions.loadQuotesWithCustomersFailure({ error })))
        )
      )
    )
  );

  addQuote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuoteActions.addQuote),
      mergeMap(({ quote }) =>
        this.quoteService.addQuote(quote).pipe(
          map((newQuote) => QuoteActions.addQuoteSuccess({ quote: newQuote })),
          catchError((error) => of(QuoteActions.addQuoteFailure({ error })))
        )
      )
    )
  );

  updateQuote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuoteActions.updateQuote),
      mergeMap(({ quote }) =>
        this.quoteService.updateQuote(quote).pipe(
          map((updatedQuote) => QuoteActions.updateQuoteSuccess({ quote: updatedQuote })),
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
          map(() => QuoteActions.deleteQuoteSuccess({ id })),
          catchError((error) => of(QuoteActions.deleteQuoteFailure({ error })))
        )
      )
    )
  );
}
