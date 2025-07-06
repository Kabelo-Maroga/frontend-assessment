import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as QuoteActions from './quote.actions';
import * as QuoteSelectors from './quote.selectors';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Quote, QuoteWithCustomer } from '../models/quote.model';
import { QuoteService } from '../services/quote.service';

@Injectable({
  providedIn: 'root',
})
export class QuoteFacade {
  quotes$ = this.store.select(QuoteSelectors.selectAllQuotes);
  quotesWithCustomers$ = this.store.select(QuoteSelectors.selectQuotesWithCustomers);
  selectedQuote$ = this.store.select(QuoteSelectors.selectSelectedQuote);
  loading$ = this.store.select(QuoteSelectors.selectQuoteLoading);
  error$ = this.store.select(QuoteSelectors.selectQuoteError);

  constructor(private store: Store, private quoteService: QuoteService) {}

  loadQuotes() {
    this.store.dispatch(QuoteActions.loadQuotes());
  }

  loadQuotesWithCustomers() {
    this.store.dispatch(QuoteActions.loadQuotesWithCustomers());
  }

  addQuote(quote: Quote) {
    this.store.dispatch(QuoteActions.addQuote({ quote }));
  }

  updateQuote(quote: Quote) {
    this.store.dispatch(QuoteActions.updateQuote({ quote }));
  }

  deleteQuote(id: string) {
    this.store.dispatch(QuoteActions.deleteQuote({ id }));
  }

  selectQuote(quote: QuoteWithCustomer | undefined) {
    this.store.dispatch(QuoteActions.selectQuote({ quote }));
  }

  getQuotesWithCustomers(): Observable<QuoteWithCustomer[]> {
    return this.quoteService.getQuotesWithCustomers();
  }

  getCustomers() {
    return this.quoteService.getCustomers();
  }

  getQuotesForCustomer(customerId: string): Observable<QuoteWithCustomer[]> {
    return this.getQuotesWithCustomers().pipe(
      map(quotes => quotes.filter(quote => quote.customerId === customerId))
    );
  }
}
