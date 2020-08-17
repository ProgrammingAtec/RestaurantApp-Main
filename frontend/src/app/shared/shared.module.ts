import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepresentationComponent } from './components/representation/representation.component';
import { MenuItemDetailsComponent } from './components/menu-item-details/menu-item-details.component';



@NgModule({
  declarations: [
    RepresentationComponent,
    MenuItemDetailsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RepresentationComponent,
    MenuItemDetailsComponent
  ]
})
export class SharedModule {}
