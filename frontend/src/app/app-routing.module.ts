import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DishesComponent} from './dishes/dishes.component';
import {BarComponent} from './bar/bar.component';
import {HomeComponent} from './home/home.component';

const router: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'dishes',
    component: DishesComponent
  },
  {
    path: 'bar',
    component: BarComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(router)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
