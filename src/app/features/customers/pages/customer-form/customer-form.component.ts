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
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const newCustomer = {
        id: `#1-${this.form.value.firstName}`,
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        addresses: []
      };
      this.customerFacade.addCustomer(newCustomer);
      this.form.reset();
    }
  }
}
