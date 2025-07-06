import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuoteListComponent } from './components/quote-list/quote-list.component';
import { QuoteFormComponent } from './components/quote-form/quote-form.component';
import { SharedModule } from "../../shared";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { quoteReducer } from './state/quote.reducer';
import { QuoteEffects } from './state/quote.effects';

const routes: Routes = [
  {
    path: '',
    component: QuoteListComponent
  }
];

@NgModule({
  declarations: [QuoteListComponent, QuoteFormComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('quotes', quoteReducer),
    EffectsModule.forFeature([QuoteEffects]),
  ],
})
export class QuoteModule {}
