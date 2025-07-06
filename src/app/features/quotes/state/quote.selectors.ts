import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QuoteState } from './quote.reducer';

export const selectQuoteState = createFeatureSelector<QuoteState>('quotes');

export const selectAllQuotes = createSelector(
  selectQuoteState,
  (state) => state.quotes
);

export const selectQuotesWithCustomers = createSelector(
  selectQuoteState,
  (state) => state.quotesWithCustomers
);

export const selectQuoteLoading = createSelector(
  selectQuoteState,
  (state) => state.loading
);

export const selectQuoteError = createSelector(
  selectQuoteState,
  (state) => state.error
);

export const selectSelectedQuote = createSelector(
  selectQuoteState,
  (state) => state.selectedQuote
);

export const selectQuotesByCustomer = (customerId: string) => createSelector(
  selectAllQuotes,
  (quotes) => quotes.filter(quote => quote.customerId === customerId)
);

export const selectQuotesByStatus = (status: string) => createSelector(
  selectAllQuotes,
  (quotes) => quotes.filter(quote => quote.status === status)
);

export const selectQuotesWithCustomersByCustomer = (customerId: string) => createSelector(
  selectQuotesWithCustomers,
  (quotes) => quotes.filter(quote => quote.customerId === customerId)
);
