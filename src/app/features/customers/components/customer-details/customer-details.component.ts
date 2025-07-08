import {Component, EventEmitter, Output} from '@angular/core';
import {CustomerFacade} from "../../state/customer.facade";

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent {
  readonly selectedCustomer$ = this.customerFacade.selectedCustomer$;
  @Output() readonly close = new EventEmitter<void>();

  constructor(private customerFacade: CustomerFacade) {
  }

  onClose(): void {
    this.close.emit();
  }
}
