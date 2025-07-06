import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MaterialModule } from './modules/material.module';
import { DialogService } from './services/dialog.service';
import {SafeUnsubscribe} from "./services/safe-unsubscribe";

@NgModule({
  declarations: [ConfirmDialogComponent, SafeUnsubscribe],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    ConfirmDialogComponent
  ],
  providers: [DialogService]
})
export class SharedModule {}
