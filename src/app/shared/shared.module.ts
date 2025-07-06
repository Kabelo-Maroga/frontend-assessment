import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MaterialModule } from './modules/material.module';
import { DialogService } from './services/dialog.service';
import { SafeUnsubscribe } from "./services/safe-unsubscribe";

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    NavigationComponent,
    SafeUnsubscribe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    ConfirmDialogComponent,
    NavigationComponent
  ],
  providers: [DialogService]
})
export class SharedModule {}
