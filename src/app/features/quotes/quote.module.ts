import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { QuoteListComponent } from './pages/quote-list/quote-list.component';
import { QuoteFormComponent } from './pages/quote-form/quote-form.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from "../../shared";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { quoteReducer } from './state/quote.reducer';
import { QuoteEffects } from './state/quote.effects';

@NgModule({
  declarations: [QuoteListComponent, QuoteFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    SharedModule,
    StoreModule.forFeature('quotes', quoteReducer),
    EffectsModule.forFeature([QuoteEffects]),
  ],
})
export class QuoteModule {}
