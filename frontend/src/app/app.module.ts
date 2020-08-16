import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeModule} from './home/home.module';
import {DishesModule} from './dishes/dishes.module';
import {BarModule} from './bar/bar.module';
import {CartComponent} from './shared/components/cart/cart.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NominationResolver} from './nomination.resolver';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    DishesModule,
    BarModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [NominationResolver],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
