import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { MatTableModule } from '@angular/material/table';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { customerReducer } from './state/customer.reducer';
import { CustomerEffects } from './state/customer.effects';
import {ReactiveFormsModule} from "@angular/forms";
import {CustomerFormComponent} from "./pages/customer-form/customer-form.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [CustomerListComponent, CustomerFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    StoreModule.forFeature('customers', customerReducer),
    EffectsModule.forFeature([CustomerEffects]),
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [CustomerListComponent]
})
export class CustomerModule {}
