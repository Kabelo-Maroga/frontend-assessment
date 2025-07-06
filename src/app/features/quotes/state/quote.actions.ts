import { createAction, props } from '@ngrx/store';
import { Quote, QuoteWithCustomer } from '../models/quote.model';

export const loadQuotes = createAction('[Quote] Load Quotes');
export const loadQuotesSuccess = createAction('[Quote] Load Quotes Success', props<{ quotes: Quote[] }>());
export const loadQuotesFailure = createAction('[Quote] Load Quotes Failure', props<{ error: any }>());

export const loadQuotesWithCustomers = createAction('[Quote] Load Quotes With Customers');
export const loadQuotesWithCustomersSuccess = createAction('[Quote] Load Quotes With Customers Success', props<{ quotesWithCustomers: QuoteWithCustomer[] }>());
export const loadQuotesWithCustomersFailure = createAction('[Quote] Load Quotes With Customers Failure', props<{ error: any }>());

export const addQuote = createAction('[Quote] Add Quote', props<{ quote: Quote }>());
export const addQuoteSuccess = createAction('[Quote] Add Quote Success', props<{ quote: Quote }>());
export const addQuoteFailure = createAction('[Quote] Add Quote Failure', props<{ error: any }>());

export const updateQuote = createAction('[Quote] Update Quote', props<{ quote: Quote }>());
export const updateQuoteSuccess = createAction('[Quote] Update Quote Success', props<{ quote: Quote }>());
export const updateQuoteFailure = createAction('[Quote] Update Quote Failure', props<{ error: any }>());

export const deleteQuote = createAction('[Quote] Delete Quote', props<{ id: string }>());
export const deleteQuoteSuccess = createAction('[Quote] Delete Quote Success', props<{ id: string }>());
export const deleteQuoteFailure = createAction('[Quote] Delete Quote Failure', props<{ error: any }>());

export const selectQuote = createAction('[Quote] Select Quote', props<{ quote: QuoteWithCustomer | undefined }>());
