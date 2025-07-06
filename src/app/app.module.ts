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
import { MatListModule } from "@angular/material/list";
import { QuoteModule } from "./features/quotes/quote.module";

@NgModule({
  declarations: [
    AppComponent
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
        QuoteModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
