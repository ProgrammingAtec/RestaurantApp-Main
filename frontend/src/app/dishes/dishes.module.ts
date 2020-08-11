import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DishesComponent} from './dishes.component';
import {SharedModule} from '../shared/shared.module';
import {HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [
    DishesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule
  ],
  exports: [
    DishesComponent
  ]
})
export class DishesModule { }
