import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerFacade } from '../../state/customer.facade';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private customerFacade: CustomerFacade) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      suburb: ['', Validators.required],
      postalCode: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const newCustomer = {
        id: `#1-${this.form.value.firstName}`,
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        addresses: [{
          street: this.form.value.street,
          city: this.form.value.city,
          suburb: this.form.value.suburb,
          postalCode: this.form.value.postalCode
        }]
      };
      this.customerFacade.addCustomer(newCustomer);
      this.form.reset();
    }
  }
}
