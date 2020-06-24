import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DishesComponent } from './dishes.component';



@NgModule({
  declarations: [
    DishesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DishesComponent
  ]
})
export class DishesModule { }
