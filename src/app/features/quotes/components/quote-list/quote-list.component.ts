import { Component, OnInit } from '@angular/core';
import {Observable, BehaviorSubject, combineLatest, takeUntil} from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { QuoteWithCustomer } from '../../models/quote.model';
import { QuoteFormComponent } from '../quote-form/quote-form.component';
import { QuoteFacade } from '../../state/quote.facade';
import { MatDialog } from '@angular/material/dialog';
import { BaseListComponent, NotificationService } from '../../../../shared';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.scss']
})
export class QuoteListComponent extends BaseListComponent implements OnInit {
  readonly quotesWithCustomers$ = this.quoteFacade.quotesWithCustomers$;
  readonly selectedQuote$ = this.quoteFacade.selectedQuote$;
  readonly displayedColumns = ['customerFullName', 'description', 'amount', 'status', 'createdDate', 'actions'];
  readonly statusOptions = ['', 'Pending', 'Approved', 'Declined'];

  filteredQuotes$!: Observable<QuoteWithCustomer[]>;

  private searchSubject$ = new BehaviorSubject<string>('');
  private statusFilterSubject$ = new BehaviorSubject<string>('');
  private selectedCustomerId: string | null = null;

  constructor(
    private quoteFacade: QuoteFacade,
    private route: ActivatedRoute,
    dialog: MatDialog,
    notificationService: NotificationService
  ) {
    super(dialog, notificationService);
    this.initFilteredQuotes();
  }

  ngOnInit(): void {
    this.quoteFacade.loadQuotes();
    this.handleRouteParams();
  }

  onSearch(value: string): void {
    this.searchSubject$.next(value);
  }

  onStatusFilter(status: string): void {
    this.statusFilterSubject$.next(status);
  }

  onRowClick(quote: QuoteWithCustomer): void {
    this.quoteFacade.selectQuote(quote);
  }

  openAddQuoteDialog(): void {
    this.openDialog(QuoteFormComponent, {
      width: '500px',
      disableClose: false
    }, 'Quote created successfully!');
  }

  openEditQuoteDialog(quote: QuoteWithCustomer): void {
    this.openDialog(QuoteFormComponent, {
      width: '500px',
      disableClose: false,
      data: { quote, isEdit: true }
    }, 'Quote updated successfully!');
  }

  deleteQuote(quote: QuoteWithCustomer): void {
    const message = `Are you sure you want to delete the quote for ${quote.customerFullName}?`;
    this.confirmDelete(message, () => {
      this.quoteFacade.deleteQuote(quote.id);
      this.notificationService.success('Quote deleted successfully!');
    });
  }

  private handleRouteParams(): void {
    this.route.queryParams
      .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe(params => {
      this.selectedCustomerId = params['customerId'] || null;
      this.initFilteredQuotes();
    });
  }

  private initFilteredQuotes(): void {
    this.filteredQuotes$ = combineLatest([
      this.quotesWithCustomers$,
      this.searchSubject$,
      this.statusFilterSubject$
    ]).pipe(
      map(([quotes, searchTerm, statusFilter]) =>
        this.filterQuotes(quotes, searchTerm, statusFilter)
      )
    );
  }

  private filterQuotes(
    quotes: QuoteWithCustomer[],
    searchTerm: string,
    statusFilter: string
  ): QuoteWithCustomer[] {
    let filtered = quotes;

    if (this.selectedCustomerId) {
      filtered = filtered.filter(quote => quote.customerId === this.selectedCustomerId);
    }

    if (searchTerm) {
      filtered = filtered.filter(quote =>
        quote.customerFullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(quote => quote.status === statusFilter);
    }

    return filtered;
  }
}
