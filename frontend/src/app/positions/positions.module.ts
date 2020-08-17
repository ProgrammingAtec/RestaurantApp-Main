import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PositionsComponent} from './positions.component';
import {SharedModule} from '../shared/shared.module';
import {HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [
    PositionsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule
  ],
  exports: [
    PositionsComponent
  ]
})
export class PositionsModule { }
