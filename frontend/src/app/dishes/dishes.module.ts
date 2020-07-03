import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DishesComponent} from './dishes.component';
import {SharedModule} from '../shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    DishesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    // BrowserAnimationsModule
  ],
  exports: [
    DishesComponent
  ]
})
export class DishesModule { }
