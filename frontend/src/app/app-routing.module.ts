import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DishesComponent} from './dishes/dishes.component';
import {HomeComponent} from './home/home.component';
import {NominationResolver} from './nomination.resolver';

const router: Routes = [
  {
    path: 'home', pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'home/:nomination', component: DishesComponent,
    resolve: { dishes: NominationResolver }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(router, {
    paramsInheritanceStrategy: 'always'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
