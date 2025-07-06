import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { QuoteService, QuoteWithCustomer } from '../../services/quote.service';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.scss']
})
export class QuoteListComponent implements OnInit {
  quotes$: Observable<QuoteWithCustomer[]>;
  displayedColumns = ['customerFullName', 'description', 'amount', 'status', 'createdDate'];

  constructor(private quoteService: QuoteService) {
    this.quotes$ = this.quoteService.getQuotesWithCustomers();
  }

  ngOnInit(): void {
    // Data is loaded through the service
  }
}
