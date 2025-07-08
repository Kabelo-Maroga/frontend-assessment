import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerFacade } from '../../state/customer.facade';
import { Customer } from '../../models/customer.model';
import {BaseFormComponent} from "../../../../shared";

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent extends BaseFormComponent implements OnInit {
  form: FormGroup;
  isEditMode = false;
  customer?: Customer;

  constructor(
    private fb: FormBuilder,
    private customerFacade: CustomerFacade,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CustomerFormComponent>
  ) {
    super();
    this.isEditMode = data?.isEdit || false;
    this.customer = data?.customer;
    this.form = this.initForm();
  }

  ngOnInit(): void {
    this.patchCustomerForm();
  }

  onSubmit(): void {
    if (!this.isFormValid()) return;

    const customer = this.isEditMode ?
      this.createUpdatedCustomer() :
      this.createNewCustomer();

    this.saveCustomer(customer);
    this.dialogRef.close(customer);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private createUpdatedCustomer(): Customer {
    const formValue = this.form.value;
    return {
      ...this.customer!,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      addresses: [this.createAddress(this.customer?.addresses?.[0]?.id)] //COme back to this!!
    };
  }

  private createNewCustomer(): Customer {
    const formValue = this.form.value;
    return {
      id: this.generateId('CUST'),
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      addresses: [this.createAddress()]
    };
  }

  private createAddress(existingId?: string): any {
    const formValue = this.form.value;
    return {
      id: existingId || this.generateId('ADDR'),
      street: formValue.street,
      city: formValue.city,
      suburb: formValue.suburb,
      postalCode: formValue.postalCode
    };
  }

  private saveCustomer(customer: Customer): void {
    if (this.isEditMode) {
      this.customerFacade.updateCustomer(customer);
    } else {
      this.customerFacade.addCustomer(customer);
    }
  }

  private patchCustomerForm(): void {
    if (this.isEditMode && this.customer) {
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
  }

  private initForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      street: ['', Validators.required],
      city: ['', Validators.required],
      suburb: ['', Validators.required],
      postalCode: ['', [Validators.required]]
    });
  }
}
