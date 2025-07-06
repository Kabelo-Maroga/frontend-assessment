import { createReducer, on } from '@ngrx/store';
import * as QuoteActions from './quote.actions';
import { Quote, QuoteWithCustomer } from '../models/quote.model';

export interface QuoteState {
  quotes: Quote[];
  quotesWithCustomers: QuoteWithCustomer[];
  selectedQuote: QuoteWithCustomer | undefined;
  loading: boolean;
  error: any;
}

export const initialState: QuoteState = {
  quotes: [],
  quotesWithCustomers: [],
  selectedQuote: undefined,
  loading: false,
  error: null,
};

export const quoteReducer = createReducer(
  initialState,

  on(QuoteActions.loadQuotes, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(QuoteActions.loadQuotesSuccess, (state, { quotes }) => ({
    ...state,
    quotes,
    loading: false,
  })),
  on(QuoteActions.loadQuotesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(QuoteActions.loadQuotesWithCustomers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(QuoteActions.loadQuotesWithCustomersSuccess, (state, { quotesWithCustomers }) => ({
    ...state,
    quotesWithCustomers,
    loading: false,
  })),
  on(QuoteActions.loadQuotesWithCustomersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(QuoteActions.addQuoteSuccess, (state, { quote }) => ({
    ...state,
    quotes: [...state.quotes, quote],
  })),
  on(QuoteActions.updateQuoteSuccess, (state, { quote }) => ({
    ...state,
    quotes: state.quotes.map((q) => (q.id === quote.id ? quote : q)),
  })),
  on(QuoteActions.deleteQuoteSuccess, (state, { id }) => ({
    ...state,
    quotes: state.quotes.filter((q) => q.id !== id),
  })),

  on(QuoteActions.selectQuote, (state, { quote }) => ({
    ...state,
    selectedQuote: quote,
  }))
);
