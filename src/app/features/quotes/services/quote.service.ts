import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quote, QuoteWithCustomer } from '../models/quote.model';
import { Customer } from '../../customers/models/customer.model';
import { Observable, of, combineLatest } from 'rxjs';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private quotesUrl = 'assets/data/quotes.json';
  private customersUrl = 'assets/data/customers.json';

  constructor(private http: HttpClient) {}

  getQuotes(): Observable<Quote[]> {
    return this.http.get<Quote[]>(this.quotesUrl);
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customersUrl);
  }

  getQuotesWithCustomers(): Observable<QuoteWithCustomer[]> {
    return combineLatest([
      this.getQuotes(),
      this.getCustomers()
    ]).pipe(
      map(([quotes, customers]) => {
        return quotes.map(quote => {
          const customer = customers.find(c => c.id === quote.customerId);
          return {
            ...quote,
            customerFullName: customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown Customer',
            customer: customer
          };
        });
      })
    );
  }

  addQuote(quote: Quote): Observable<Quote> {
    // In a real app, this would make an HTTP POST request
    // For now, we'll simulate the API call
    console.log('Adding new quote:', quote);
    return of(quote).pipe(delay(300));
  }

  updateQuote(quote: Quote): Observable<Quote> {
    return of(quote).pipe(delay(300));
  }

  deleteQuote(id: string): Observable<void> {
    return of(undefined).pipe(delay(300));
  }
}
