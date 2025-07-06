import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../services/notification.service';
import { filter, takeUntil } from 'rxjs/operators';
import { SafeUnsubscribe } from '../services/safe-unsubscribe';

@Component({
  template: ''
})
export abstract class BaseListComponent extends SafeUnsubscribe {

  protected constructor(
    protected dialog: MatDialog,
    protected notificationService: NotificationService
  ) {
    super();
  }

  protected openDialog<T>(
    component: any,
    config: any = {},
    successMessage: string = 'Operation completed successfully'
  ): void {
    const dialogRef = this.dialog.open(component, config);
    this.handleDialogClose(dialogRef, successMessage);
  }

  protected handleDialogClose<T>(
    dialogRef: MatDialogRef<any>,
    successMessage: string
  ): void {
    dialogRef.afterClosed()
      .pipe(
        filter(Boolean),
        takeUntil(this._ngUnsubscribe)
      )
      .subscribe(() => this.notificationService.success(successMessage));
  }

  protected confirmDelete(message: string, callback: () => void): void {
    if (confirm(message)) {
      callback();
    }
  }
}
