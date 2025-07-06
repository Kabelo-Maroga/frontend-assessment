import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QuoteState } from './quote.reducer';

export const selectQuoteState = createFeatureSelector<QuoteState>('quotes');

export const selectQuotesWithCustomers = createSelector(
  selectQuoteState,
  (state) => state.quotesWithCustomers
);

export const selectQuoteLoading = createSelector(
  selectQuoteState,
  (state) => state.loading
);

export const selectSelectedQuote = createSelector(
  selectQuoteState,
  (state) => state.selectedQuote
);
