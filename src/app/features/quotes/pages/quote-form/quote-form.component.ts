import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from '../../../customers/models/customer.model';
import { Quote, QuoteWithCustomer } from '../../models/quote.model';
import { NotificationService } from '../../../../shared';
import { QuoteFacade } from '../../state/quote.facade';

export interface QuoteDialogData {
  quote?: QuoteWithCustomer;
  isEdit?: boolean;
}

@Component({
  selector: 'app-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.scss']
})
export class QuoteFormComponent implements OnInit {
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
    this.isEditMode = data?.isEdit || false;
    this.currentQuote = data?.quote;
    this.form = this.initializeForm();
  }

  ngOnInit(): void {
    this.patchForm();
  }

  onSubmit(): void {
    if (!this.form.valid) {
      this.markFormAsTouched();
      return;
    }

    const formValue = this.form.value;

    if (this.isEditMode && this.currentQuote) {
      const updatedQuote: Quote = {
        ...this.currentQuote,
        customerId: formValue.customerId,
        amount: formValue.amount,
        status: formValue.status,
        description: formValue.description
      };

      this.quoteFacade.updateQuote(updatedQuote);
      this.notificationService.success('Quote updated successfully!');
      this.dialogRef.close(updatedQuote);
    } else {
      const newQuote: Quote = {
        id: this.generateId("quote"),
        customerId: formValue.customerId,
        amount: formValue.amount,
        status: formValue.status,
        createdDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
        description: formValue.description
      };

      this.quoteFacade.addQuote(newQuote);
      this.notificationService.success('Quote created successfully!');
      this.dialogRef.close(newQuote);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  getCustomerDisplayName(customer: Customer): string {
    return `${customer.firstName} ${customer.lastName}`;
  }

  private patchForm(): void {
    if (this.isEditMode && this.currentQuote) {
      this.form.patchValue({
        customerId: this.currentQuote.customerId,
        description: this.currentQuote.description,
        amount: this.currentQuote.amount,
        status: this.currentQuote.status
      });
    }
  }

  private initializeForm(): FormGroup {
    return this.fb.group({
      customerId: ['', [Validators.required]],
      description: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });
  }

  private generateId(prefix: string): string {
    const timestamp = Date.now();
    return `${prefix}-${timestamp}`;
  }

  private markFormAsTouched(): void {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      control?.markAsTouched();
    });
  }
}
