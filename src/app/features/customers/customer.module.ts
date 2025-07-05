import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { MatTableModule } from '@angular/material/table';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { customerReducer } from './state/customer.reducer';
import { CustomerEffects } from './state/customer.effects';

@NgModule({
  declarations: [CustomerListComponent],
  imports: [
    CommonModule,
    MatTableModule,
    StoreModule.forFeature('customers', customerReducer),
    EffectsModule.forFeature([CustomerEffects])
  ],
  exports: [CustomerListComponent]
})
export class CustomerModule {}
