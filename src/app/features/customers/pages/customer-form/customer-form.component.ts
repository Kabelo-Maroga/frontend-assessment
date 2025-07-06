import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerFacade } from '../../state/customer.facade';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../../models/customer.model';
import { CustomerFormData } from "../../models/customer-form.model";

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  form: FormGroup;
  ieEdit: boolean = false;
  customer?: Customer;

  constructor(
    private fb: FormBuilder,
    private customerFacade: CustomerFacade,
    @Inject(MAT_DIALOG_DATA) public data: CustomerFormData,
    public dialogRef: MatDialogRef<CustomerFormComponent>
  ) {
    this.ieEdit = data?.isEdit || false;
    this.customer = data?.customer;
    this.form = this.initializeForm();
  }

  ngOnInit(): void {
    if (this.ieEdit && this.customer) {
      this.populateForm();
    }
  }

  onSubmit(): void {
    if (!this.form.valid) {
      this.markFormAsTouched();
      return;
    }

    const formValue = this.form.value;

    if (this.ieEdit && this.customer) {
      this.updateCustomer(formValue);
    } else {
      this.createCustomer(formValue);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  get dialogTitle(): string {
    return this.ieEdit ? 'Edit Customer' : 'Add New Customer';
  }

  get submitButtonText(): string {
    return this.ieEdit ? 'Update' : 'Create';
  }

  private initializeForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      street: ['', Validators.required],
      city: ['', Validators.required],
      suburb: ['', Validators.required],
      postalCode: ['', [Validators.required]]
    });
  }

  private populateForm(): void {
    if (!this.customer) return;

    const firstAddress = this.customer.addresses?.[0];
    this.form.patchValue({
      firstName: this.customer.firstName,
      lastName: this.customer.lastName,
      street: firstAddress?.street || '',
      city: firstAddress?.city || '',
      suburb: firstAddress?.suburb || '',
      postalCode: firstAddress?.postalCode || ''
    });
  }

  private updateCustomer(formValue: any): void {
    if (!this.customer) return;

    const customer = {
      ...this.customer,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      addresses: [{
        id: this.customer.addresses?.[0]?.id || this.generateId("ADDR"),
        street: formValue.street,
        city: formValue.city,
        suburb: formValue.suburb,
        postalCode: formValue.postalCode
      }]
    };

    this.customerFacade.updateCustomer(customer);
    this.dialogRef.close(customer);
  }

  private createCustomer(formValue: any): void {
    const newCustomer = {
      id: this.generateId("CUST"),
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      addresses: [{
        id: this.generateId("ADDR"),
        street: formValue.street,
        city: formValue.city,
        suburb: formValue.suburb,
        postalCode: formValue.postalCode
      }]
    };

    this.customerFacade.addCustomer(newCustomer);
    this.dialogRef.close(newCustomer);
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
