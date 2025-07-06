import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerFormComponent } from "./components/customer-form/customer-form.component";
import { CustomerDetailsComponent } from "./components/customer-details/customer-details.component";
import { customerReducer } from './state/customer.reducer';
import { CustomerEffects } from './state/customer.effects';
import { SharedModule } from '../../shared';

const routes: Routes = [
  {
    path: '',
    component: CustomerListComponent
  }
];

@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerFormComponent,
    CustomerDetailsComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('customers', customerReducer),
    EffectsModule.forFeature([CustomerEffects]),
  ]
})
export class CustomerModule {}
