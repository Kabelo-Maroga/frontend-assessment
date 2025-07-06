import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CustomerModule } from "./features/customers/customer.module";
import { SharedModule } from "./shared";
import { QuoteListComponent } from './features/quotes/pages/quote-list/quote-list.component';
import { MatListModule } from "@angular/material/list";

@NgModule({
  declarations: [
    AppComponent,
    QuoteListComponent
  ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        StoreModule.forRoot({}, {}),
        EffectsModule.forRoot([]),
        SharedModule,
        CustomerModule,
        MatListModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
