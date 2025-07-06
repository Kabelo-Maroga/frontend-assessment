import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as QuoteActions from './quote.actions';
import * as QuoteSelectors from './quote.selectors';
import { Observable } from 'rxjs';
import { Quote } from '../models/quote.model';

@Injectable({
  providedIn: 'root',
})
export class QuoteFacade {
  quotes$: Observable<Quote[]> = this.store.select(QuoteSelectors.selectAllQuotes);
  loading$: Observable<boolean> = this.store.select(QuoteSelectors.selectQuoteLoading);
  error$: Observable<any> = this.store.select(QuoteSelectors.selectQuoteError);

  constructor(private store: Store) {}

  loadQuotes() {
    this.store.dispatch(QuoteActions.loadQuotes());
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
}
