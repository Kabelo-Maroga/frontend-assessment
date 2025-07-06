import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from '../../../customers/models/customer.model';
import { Quote, QuoteWithCustomer } from '../../models/quote.model';
import { NotificationService } from '../../../../shared';
import { QuoteFacade } from '../../state/quote.facade';
import { BaseFormComponent } from '../../../../shared/components/base-form.component';

export interface QuoteDialogData {
  quote?: QuoteWithCustomer;
  isEdit?: boolean;
}

@Component({
  selector: 'app-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.scss']
})
export class QuoteFormComponent extends BaseFormComponent implements OnInit {
  form: FormGroup;
  customers$ = this.quoteFacade.getCustomers();
  statusOptions = ['Pending', 'Approved', 'Declined'];
  isEditMode = false;
  currentQuote?: QuoteWithCustomer;

  constructor(
    private fb: FormBuilder,
    private quoteFacade: QuoteFacade,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<QuoteFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: QuoteDialogData
  ) {
    super();
    this.isEditMode = data?.isEdit || false;
    this.currentQuote = data?.quote;
    this.form = this.createForm();
  }

  ngOnInit(): void {
    if (this.isEditMode && this.currentQuote) {
      this.patchForm();
    }
  }

  onSubmit(): void {
    if (!this.isFormValid()) return;

    const quote = this.buildQuote();
    
    if (this.isEditMode) {
      this.updateQuote(quote);
    } else {
      this.createQuote(quote);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  getCustomerDisplayName(customer: Customer): string {
    return `${customer.firstName} ${customer.lastName}`;
  }

  private createForm(): FormGroup {
    return this.fb.group({
      customerId: ['', Validators.required],
      description: ['', Validators.required],
      amount: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  private patchForm(): void {
    this.form.patchValue({
      customerId: this.currentQuote!.customerId,
      description: this.currentQuote!.description,
      amount: this.currentQuote!.amount,
      status: this.currentQuote!.status
    });
  }

  private buildQuote(): Quote {
    const formValue = this.form.value;
    const baseQuote = {
      customerId: formValue.customerId,
      amount: formValue.amount,
      status: formValue.status,
      description: formValue.description
    };

    if (this.isEditMode && this.currentQuote) {
      return { ...this.currentQuote, ...baseQuote };
    }

    return {
      ...baseQuote,
      id: this.generateId('quote'),
      createdDate: new Date().toISOString().split('T')[0]
    };
  }

  private updateQuote(quote: Quote): void {
    this.quoteFacade.updateQuote(quote);
    this.notificationService.success('Quote updated successfully!');
    this.dialogRef.close(quote);
  }

  private createQuote(quote: Quote): void {
    this.quoteFacade.addQuote(quote);
    this.notificationService.success('Quote created successfully!');
    this.dialogRef.close(quote);
  }
}
