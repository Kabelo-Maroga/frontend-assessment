import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { QuoteWithCustomer } from '../../models/quote.model';
import { QuoteFormComponent } from '../quote-form/quote-form.component';
import { NotificationService } from '../../../../shared/services/notification.service';
import { QuoteFacade } from '../../state/quote.facade';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.scss']
})
export class QuoteListComponent implements OnInit {
  quotes$: Observable<QuoteWithCustomer[]>;
  filteredQuotes$!: Observable<QuoteWithCustomer[]>;
  selectedQuote$ = this.quoteFacade.selectedQuote$;
  displayedColumns = ['customerFullName', 'description', 'amount', 'status', 'createdDate', 'actions'];
  
  private searchSubject$ = new BehaviorSubject<string>('');
  private statusFilterSubject$ = new BehaviorSubject<string>('');
  
  statusOptions = ['', 'Pending', 'Approved', 'Declined'];
  selectedCustomerId: string | null = null;

  constructor(
    private quoteFacade: QuoteFacade,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private route: ActivatedRoute
  ) {
    this.quotes$ = this.quoteFacade.getQuotesWithCustomers();
    this.setupFiltering();
  }

  ngOnInit(): void {
    // Load quotes when component initializes
    this.quoteFacade.loadQuotes();
    
    // Check if we have a customer filter from route params
    this.route.queryParams.subscribe(params => {
      this.selectedCustomerId = params['customerId'] || null;
      this.setupFiltering();
    });
  }

  onSearch(value: string): void {
    this.searchSubject$.next(value);
  }

  onStatusFilter(status: string): void {
    this.statusFilterSubject$.next(status);
  }

  private setupFiltering(): void {
    this.filteredQuotes$ = combineLatest([
      this.quotes$,
      this.searchSubject$.pipe(debounceTime(300)),
      this.statusFilterSubject$
    ]).pipe(
      map(([quotes, searchTerm, statusFilter]) => {
        let filtered = quotes;

        // Filter by selected customer if coming from customer page
        if (this.selectedCustomerId) {
          filtered = filtered.filter(quote => quote.customerId === this.selectedCustomerId);
        }

        // Filter by search term (customer name)
        if (searchTerm) {
          filtered = filtered.filter(quote =>
            quote.customerFullName.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        // Filter by status
        if (statusFilter) {
          filtered = filtered.filter(quote => quote.status === statusFilter);
        }

        return filtered;
      })
    );
  }

  openAddQuoteDialog(): void {
    const dialogRef = this.dialog.open(QuoteFormComponent, {
      width: '500px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Refresh the quotes list by reloading from the store
        this.quotes$ = this.quoteFacade.getQuotesWithCustomers();
        console.log('Quote created:', result);
      }
    });
  }

  openEditQuoteDialog(quote: QuoteWithCustomer): void {
    const dialogRef = this.dialog.open(QuoteFormComponent, {
      width: '500px',
      disableClose: false,
      data: { quote, isEdit: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.quotes$ = this.quoteFacade.getQuotesWithCustomers();
        this.notificationService.success('Quote updated successfully!');
      }
    });
  }

  deleteQuote(quote: QuoteWithCustomer): void {
    const message = `Are you sure you want to delete the quote for ${quote.customerFullName}?`;
    
    if (confirm(message)) {
      this.quoteFacade.deleteQuote(quote.id);
      this.quotes$ = this.quoteFacade.getQuotesWithCustomers();
      this.notificationService.success('Quote deleted successfully!');
    }
  }

  onRowClick(quote: QuoteWithCustomer): void {
    this.quoteFacade.selectQuote(quote);
  }

  onCloseDetails(): void {
    this.quoteFacade.selectQuote(undefined);
  }
}
