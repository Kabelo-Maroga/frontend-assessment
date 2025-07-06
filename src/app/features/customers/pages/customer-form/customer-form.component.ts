import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerFacade } from '../../state/customer.facade';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customerFacade: CustomerFacade,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CustomerFormComponent>
  ) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      street: ['', Validators.required],
      city: ['', Validators.required],
      suburb: ['', Validators.required],
      postalCode: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
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
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private generateId(prefix: string): string {
    const timestamp = Date.now();
    return `${prefix}-${timestamp}`;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      control?.markAsTouched();
    });
  }
}
