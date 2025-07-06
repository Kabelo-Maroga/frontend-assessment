import { Component, Input } from '@angular/core';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent {
  @Input() customer!: Customer;
}
