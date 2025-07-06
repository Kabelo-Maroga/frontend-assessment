import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  private getDefaultConfig(panelClass: string[], duration: number) {
    return {
      duration,
      panelClass,
      horizontalPosition: 'right' as const,
      verticalPosition: 'top' as const
    };
  }

  success(message: string, duration: number = 3000): void {
    this.snackBar.open(message, '',
      this.getDefaultConfig(['success-snackbar'], duration)
    );
  }

  error(message: string, duration: number = 5000): void {
    this.snackBar.open(message, '',
      this.getDefaultConfig(['error-snackbar'], duration)
    );
  }

  info(message: string, duration: number = 3000): void {
    this.snackBar.open(message, '',
      this.getDefaultConfig(['info-snackbar'], duration)
    );
  }

  warning(message: string, duration: number = 4000): void {
    this.snackBar.open(message, '',
      this.getDefaultConfig(['warning-snackbar'], duration)
    );
  }
}
