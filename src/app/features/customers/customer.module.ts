import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { CustomerFormComponent } from "./pages/customer-form/customer-form.component";
import { CustomerDetailsComponent } from "./components/customer-details/customer-details.component";
import { customerReducer } from './state/customer.reducer';
import { CustomerEffects } from './state/customer.effects';
import { SharedModule } from '../../shared';
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerFormComponent,
    CustomerDetailsComponent
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('customers', customerReducer),
    EffectsModule.forFeature([CustomerEffects]),
    MatTooltipModule
  ],
  exports: [CustomerListComponent]
})
export class CustomerModule {}
