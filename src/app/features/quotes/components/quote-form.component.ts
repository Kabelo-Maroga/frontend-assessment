import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Quote } from "../models/quote.model";

@Component({
  selector: 'app-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.scss']
})
export class QuoteFormComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<QuoteFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Quote
  ) {
    this.form = this.fb.group({
      id: [data.id],
      customerId: [data.customerId, Validators.required],
      // customerFullName: [data.customerFullName, Validators.required],
      amount: [data.amount, [Validators.required, Validators.min(0)]],
      status: [data.status, Validators.required],
      createdDate: [data.createdDate, Validators.required]
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
