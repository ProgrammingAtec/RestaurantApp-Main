import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeModule} from './home/home.module';
import {PositionsModule} from './positions/positions.module';
import {CartComponent} from './shared/components/cart/cart.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NominationResolver} from './nomination.resolver';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import {TypeEqualityPipe} from "./shared/pipes/type-equality.pipe";

@NgModule({
    declarations: [
        AppComponent,
        CartComponent,
        AdminComponent,
        TypeEqualityPipe
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HomeModule,
    PositionsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [NominationResolver],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
