import { NgModule } from '@angular/core';
import { QuoteListComponent } from './components/quote-list/quote-list.component';
import { QuoteFormComponent } from './components/quote-form/quote-form.component';
import { SharedModule } from "../../shared";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { quoteReducer } from './state/quote.reducer';
import { QuoteEffects } from './state/quote.effects';

@NgModule({
  declarations: [QuoteListComponent, QuoteFormComponent],
  imports: [
    SharedModule,
    StoreModule.forFeature('quotes', quoteReducer),
    EffectsModule.forFeature([QuoteEffects]),
  ],
})
export class QuoteModule {}
