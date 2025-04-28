import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { AuthGuardService } from '../shared/guards/auth-guard.service';

const routes: Routes = [
  // {
  //   path: 'dashboard',
  //   component: DashbordComponent,
  //   data: {
  //     title: 'Page',
  //   },
  //   canActivate: [AuthGuardService],
  //   resolve: {
  //     statistics: DashboardResolver,
  //     tickets: DashboardTicketsResolver,

  //   },
  //   children: []
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule],
})
export class PagesRoutingModule { }
