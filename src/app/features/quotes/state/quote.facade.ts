import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as QuoteActions from './quote.actions';
import * as QuoteSelectors from './quote.selectors';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Quote, QuoteWithCustomer } from '../models/quote.model';
import { QuoteService } from '../services/quote.service';

@Injectable({
  providedIn: 'root',
})
export class QuoteFacade {
  quotes$: Observable<Quote[]> = this.store.select(QuoteSelectors.selectAllQuotes);
  quotesWithCustomers$: Observable<QuoteWithCustomer[]> = this.store.select(QuoteSelectors.selectQuotesWithCustomers);
  selectedQuote$: Observable<QuoteWithCustomer | undefined> = this.store.select(QuoteSelectors.selectSelectedQuote);
  loading$: Observable<boolean> = this.store.select(QuoteSelectors.selectQuoteLoading);
  error$: Observable<any> = this.store.select(QuoteSelectors.selectQuoteError);

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

  // Enhanced methods for working with customers
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

  getQuotesByCustomerFromStore(customerId: string): Observable<Quote[]> {
    return this.store.select(QuoteSelectors.selectQuotesByCustomer(customerId));
  }

  getQuotesByStatusFromStore(status: string): Observable<Quote[]> {
    return this.store.select(QuoteSelectors.selectQuotesByStatus(status));
  }
}
