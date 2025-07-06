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
  quotesWithCustomers$ = this.store.select(QuoteSelectors.selectQuotesWithCustomers);
  selectedQuote$ = this.store.select(QuoteSelectors.selectSelectedQuote);

  constructor(private store: Store, private quoteService: QuoteService) {}

  loadQuotesWithCustomers() {
    this.store.dispatch(QuoteActions.loadQuotes());
  }

  addQuote(quoteWithCustomer: QuoteWithCustomer) {
    this.store.dispatch(QuoteActions.addQuote({ quoteWithCustomer }));
  }

  updateQuote(quoteWithCustomer: QuoteWithCustomer) {
    this.store.dispatch(QuoteActions.updateQuote({ quoteWithCustomer }));
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
