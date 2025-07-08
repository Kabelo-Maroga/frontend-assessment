import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest, takeUntil, filter } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { QuoteWithCustomer, QuoteStatus } from '../../models/quote.model';
import { QuoteFormComponent } from '../quote-form/quote-form.component';
import { QuoteFacade } from '../../state/quote.facade';
import { MatDialog } from '@angular/material/dialog';
import {
  BaseListComponent,
  NotificationService,
  DialogService,
  SuccessMessages,
  ConfirmMessages,
  TableColumns,
  RouteParams,
  DialogConfig
} from '../../../../shared';

interface QuoteDialogConfig {
  width: string;
  disableClose: boolean;
  data?: {
    quote?: QuoteWithCustomer;
    isEdit?: boolean;
  };
}

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.scss']
})
export class QuoteListComponent extends BaseListComponent implements OnInit {
  readonly quotesWithCustomers$ = this.quoteFacade.quotesWithCustomers$;
  readonly selectedQuote$ = this.quoteFacade.selectedQuote$;
  readonly statusOptions = ['', QuoteStatus.Pending, QuoteStatus.Approved, QuoteStatus.Declined];
  readonly displayedColumns = [
    TableColumns.QUOTE.CUSTOMER_FULL_NAME,
    TableColumns.QUOTE.DESCRIPTION,
    TableColumns.QUOTE.AMOUNT,
    TableColumns.QUOTE.STATUS,
    TableColumns.QUOTE.CREATED_DATE,
    TableColumns.QUOTE.ACTIONS
  ];

  filteredQuotes$!: Observable<QuoteWithCustomer[]>;

  private searchSubject$ = new BehaviorSubject<string>('');
  private statusFilterSubject$ = new BehaviorSubject<string>('');
  private selectedCustomerId: string | null = null;

  constructor(
    private quoteFacade: QuoteFacade,
    private route: ActivatedRoute,
    dialog: MatDialog,
    notificationService: NotificationService,
    private dialogService: DialogService
  ) {
    super(dialog, notificationService);
    this.initFilteredQuotes();
  }

  ngOnInit(): void {
    this.quoteFacade.loadQuotes();
    this.subscribeToRouteParams();
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
    const config = this.createDialogConfig();
    this.openQuoteDialog(config, SuccessMessages.QUOTE_ADDED);
  }

  openEditQuoteDialog(quote: QuoteWithCustomer): void {
    const config = this.createDialogConfig({ quote, isEdit: true });
    this.openQuoteDialog(config, SuccessMessages.QUOTE_UPDATED);
  }

  deleteQuote(quote: QuoteWithCustomer): void {
    this.showDeleteConfirmation(quote).pipe(
      filter(Boolean),
      takeUntil(this._ngUnsubscribe)
    ).subscribe(() => this.handleQuoteDeletion(quote));
  }

  private createDialogConfig(data?: QuoteDialogConfig['data']): QuoteDialogConfig {
    return {
      width: DialogConfig.DEFAULT_WIDTH,
      disableClose: false,
      ...(data && { data })
    };
  }

  private openQuoteDialog(config: QuoteDialogConfig, successMessage: string): void {
    this.openDialog(QuoteFormComponent, config, successMessage);
  }

  private showDeleteConfirmation(quote: QuoteWithCustomer): Observable<boolean> {
    return this.dialogService.confirm({
      message: ConfirmMessages.DELETE_QUOTE(quote.customerFullName),
      entity: quote
    });
  }

  private handleQuoteDeletion(quote: QuoteWithCustomer): void {
    this.quoteFacade.deleteQuote(quote.id);
    this.notificationService.success(SuccessMessages.QUOTE_DELETED);
  }

  private subscribeToRouteParams(): void {
    this.route.queryParams
      .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe(params => this.handleQueryParams(params));
  }

  private handleQueryParams(params: any): void {
    this.selectedCustomerId = params[RouteParams.CUSTOMER_ID] || null;
    this.initFilteredQuotes();
  }

  private initFilteredQuotes(): void {
    this.filteredQuotes$ = this.createFilteredQuotes$();
  }

  private createFilteredQuotes$(): Observable<QuoteWithCustomer[]> {
    return combineLatest([
      this.quotesWithCustomers$,
      this.searchSubject$,
      this.statusFilterSubject$
    ]).pipe(
      map(([quotes, searchTerm, statusFilter]) =>
        this.applyFilters(quotes, searchTerm, statusFilter)
      )
    );
  }

  private applyFilters(
    quotes: QuoteWithCustomer[],
    searchTerm: string,
    statusFilter: string
  ): QuoteWithCustomer[] {
    return quotes
      .filter(quote => this.filterByCustomerId(quote))
      .filter(quote => this.filterBySearchTerm(quote, searchTerm))
      .filter(quote => this.filterByStatus(quote, statusFilter));
  }

  private filterByCustomerId(quote: QuoteWithCustomer): boolean {
    return !this.selectedCustomerId || quote.customerId === this.selectedCustomerId;
  }

  private filterBySearchTerm(quote: QuoteWithCustomer, searchTerm: string): boolean {
    return !searchTerm || quote.customerFullName.toLowerCase().includes(searchTerm.toLowerCase());
  }

  private filterByStatus(quote: QuoteWithCustomer, statusFilter: string): boolean {
    return !statusFilter || quote.status === statusFilter as QuoteStatus;
  }
}
