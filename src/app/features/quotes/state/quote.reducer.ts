import { createReducer, on } from '@ngrx/store';
import * as QuoteActions from './quote.actions';
import { Quote } from '../models/quote.model';

export interface QuoteState {
  quotes: Quote[];
  loading: boolean;
  error: any;
}

export const initialState: QuoteState = {
  quotes: [],
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
  }))
);
