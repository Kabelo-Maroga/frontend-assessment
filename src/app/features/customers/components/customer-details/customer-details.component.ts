import { Component, Input } from '@angular/core';
import { Customer } from '../../models/customer.model';
import {CustomerFacade} from "../../state/customer.facade";
import {selectedCustomer} from "../../state/customer.selectors";

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent {
  selectedCustomer$ = this.customerFacade.selectedCustomer$;
  constructor(private customerFacade: CustomerFacade) {}
}
