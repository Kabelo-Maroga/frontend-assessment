import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QuoteState } from './quote.reducer';

export const selectQuoteState = createFeatureSelector<QuoteState>('quotes');

export const selectAllQuotes = createSelector(
  selectQuoteState,
  (state) => state.quotes
);

export const selectQuoteLoading = createSelector(
  selectQuoteState,
  (state) => state.loading
);

export const selectQuoteError = createSelector(
  selectQuoteState,
  (state) => state.error
);
