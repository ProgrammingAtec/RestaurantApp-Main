import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PositionsComponent} from './positions/positions.component';
import {HomeComponent} from './home/home.component';
import {NominationResolver} from './nomination.resolver';

const router: Routes = [
  {
    path: '', pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: ':nomination', component: PositionsComponent,
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
