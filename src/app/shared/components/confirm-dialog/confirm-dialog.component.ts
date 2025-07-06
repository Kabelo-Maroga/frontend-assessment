import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Identifiable} from "../../../features/customers/models/identifiable";
import {CustomerFacade} from "../../../features/customers/state/customer.facade";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent<T extends Identifiable> {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string, entity: T},
    public dialogRef: MatDialogRef<ConfirmDialogComponent<T>>,
    private customerFacade: CustomerFacade
  ) {}

  confirm(): void {
    // this.data.entity.id;
    this.customerFacade.deleteCustomer(this.data.entity.id);
  }
}
