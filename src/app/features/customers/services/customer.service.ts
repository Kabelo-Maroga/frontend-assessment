import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly apiUrl = 'assets/data/customers.json';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return new Observable(observer => {
      observer.next(customer);
      observer.complete();
    });
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return new Observable(observer => {
      observer.next(customer);
      observer.complete();
    });
  }

  deleteCustomer(id: string): Observable<string> {
    return new Observable(observer => {
      observer.next(id);
      observer.complete();
    });
  }
}
