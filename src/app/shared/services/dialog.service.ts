import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DialogService<T> {
  constructor(private dialog: MatDialog) {}

  confirm(title: string, message: string, entity: T): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { title, message, entity },
    });

    return dialogRef.afterClosed();
  }
}
