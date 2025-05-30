import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PharmaciesComponent } from './pharmacies/pharmacies.component';
import { AuthGuardService } from '../shared/guards/auth-guard.service';
import { PharmaciseRedolver } from '../shared/resolver/pharmacies.resolver';
import { InspectorsComponent } from './inspectors/inspectors.component';
import { InspectorRedolver } from '../shared/resolver/inspectors.resolver';
import { AdminsRedolver } from '../shared/resolver/admins.resolver';
import { AdminsComponent } from './admins/admins.component';
import { MobileVersionsComponent } from './settings/components/mobile-versions/mobile-versions.component';
import { MobileVersionResolver } from '../shared/resolver/mobile-versions';
//import { AuthGuardService } from '../shared/guards/auth-guard.service';

const routes: Routes = [
  {
    path: 'pharmacies',
    component: PharmaciesComponent,
    data: {
      title: 'Page',
    },
    canActivate: [AuthGuardService],
    resolve: {

      pharmacies: PharmaciseRedolver,

    },
    children: []
  }, {
    path: 'inspectors',
    component: InspectorsComponent,
    data: {
      title: 'Page',
    },
    canActivate: [AuthGuardService],
    resolve: {

      inspectors: InspectorRedolver,

    },
    children: []
  }, {
    path: 'admins',
    component: AdminsComponent,
    data: {
      title: 'Page',
    },
    canActivate: [AuthGuardService],
    resolve: {

      admins: AdminsRedolver,

    },
    children: []
  }, {
    path: 'settings',
    redirectTo: 'mobile-versions',
    pathMatch: 'full',
  }, {
    path: 'mobile-versions',
    component: MobileVersionsComponent,
    data: {
      title: 'Page',
    },
    canActivate: [AuthGuardService],
    resolve: {

      mobileVersions: MobileVersionResolver,

    },
    children: []
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule],
})
export class PagesRoutingModule { }
