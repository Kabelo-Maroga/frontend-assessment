import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface BaseDialogData {
  title: string;
  confirmText?: string;
  cancelText?: string;
  data?: any;
}

@Component({
  template: ''
})
export abstract class BaseDialogComponent<T = any> {
  abstract form: FormGroup;

  protected constructor(
    @Inject(MAT_DIALOG_DATA) public data: BaseDialogData,
    public dialogRef: MatDialogRef<BaseDialogComponent<T>>
  ) {}

  abstract onSubmit(): void;

  onCancel(): void {
    this.dialogRef.close();
  }

  get isFormValid(): boolean {
    return this.form.valid;
  }

  get formValue(): any {
    return this.form.value;
  }

  protected generateId(prefix: string): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `${prefix}-${timestamp}-${random}`;
  }

  protected markFormGroupTouched(): void {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      control?.markAsTouched();
    });
  }

  protected getFieldError(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${this.formatFieldName(fieldName)} is required`;
      if (field.errors['minlength']) return `${this.formatFieldName(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters`;
      if (field.errors['pattern']) return `${this.formatFieldName(fieldName)} format is invalid`;
      if (field.errors['email']) return `${this.formatFieldName(fieldName)} must be a valid email`;
    }
    return '';
  }

  private formatFieldName(fieldName: string): string {
    return fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  }
}
