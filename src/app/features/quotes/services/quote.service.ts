import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quote, QuoteWithCustomer } from '../models/quote.model';
import { Customer } from '../../customers/models/customer.model';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

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

  addQuote(quoteWithCustomer: QuoteWithCustomer): Observable<QuoteWithCustomer> {
    return this.getCustomers().pipe(
      map(customers => {
        const customer = customers.find(c => c.id === quoteWithCustomer.customerId);
        return {
          ...quoteWithCustomer,
          customerFullName: customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown Customer',
          customer: customer
        };
      })
    );
  }

  updateQuote(quoteWithCustomer: QuoteWithCustomer): Observable<QuoteWithCustomer> {
    return this.getCustomers().pipe(
      map(customers => {
        const customer = customers.find(c => c.id === quoteWithCustomer.customerId);
        return {
          ...quoteWithCustomer,
          customerFullName: customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown Customer',
          customer: customer
        };
      })
    );
  }

  deleteQuote(id: string): Observable<string> {
    return new Observable(observer => {
      observer.next(id);
      observer.complete();
    });
  }
}
