import { createReducer, on } from '@ngrx/store';
import * as QuoteActions from './quote.actions';
import { QuoteWithCustomer } from '../models/quote.model';

export interface QuoteState {
  quotesWithCustomers: QuoteWithCustomer[];
  selectedQuote: QuoteWithCustomer | undefined;
  loading: boolean;
  error: any;
}

export const initialState: QuoteState = {
  quotesWithCustomers: [],
  selectedQuote: undefined,
  loading: false,
  error: null
};

export const quoteReducer = createReducer(
  initialState,

  on(QuoteActions.loadQuotes, (state) => ({
    ...state,
    loading: true,
  })),

  on(QuoteActions.loadQuotesSuccess, (state, { quotesWithCustomers }) => ({
    ...state,
    quotesWithCustomers,
    loading: false,
  })),

  on(QuoteActions.loadQuotesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(QuoteActions.addQuoteSuccess, (state, { quoteWithCustomer }) => ({
    ...state,
    quotesWithCustomers: [...state.quotesWithCustomers, quoteWithCustomer],
  })),

  on(QuoteActions.addQuoteFailure, (state, { error }) => ({
    ...state,
    error
  })),

  on(QuoteActions.updateQuoteSuccess, (state, { quoteWithCustomer }) => ({
    ...state,
    quotesWithCustomers: state.quotesWithCustomers.map((q) => (q.id === quoteWithCustomer.id ? quoteWithCustomer : q)),
  })),

  on(QuoteActions.updateQuoteFailure, (state, { error }) => ({
    ...state,
    error
  })),

  on(QuoteActions.deleteQuoteSuccess, (state, { id }) => ({
    ...state,
    quotesWithCustomers: state.quotesWithCustomers.filter((q) => q.id !== id),
  })),

  on(QuoteActions.deleteQuoteFailure, (state, { error }) => ({
    ...state,
  })),

  on(QuoteActions.selectQuote, (state, { quote }) => ({
    ...state,
    selectedQuote: quote,
  }))
);
