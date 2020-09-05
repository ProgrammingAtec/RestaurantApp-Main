import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PositionsComponent} from './positions/positions.component';
import {HomeComponent} from './home/home.component';
import {NominationResolver} from './nomination.resolver';
import {AdminComponent} from './admin/admin.component';

const router: Routes = [
  {
    path: '', pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'admin', component: AdminComponent
  },
  {
    path: ':nomination', component: PositionsComponent,
    resolve: { dishes: NominationResolver }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(router)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
