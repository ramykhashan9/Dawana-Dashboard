import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { ConfirmLoginComponent } from './confirm-login/confirm-login.component';
import { ConfirmLoginGuardService } from '../shared/guards/confirm-login-guard.service';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'error',
        component: ErrorComponent,
        data: {
          title: 'Error Page',
        },
      },
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Login Page',
        },
      },
       {
        path: 'confirm-login',
        component: ConfirmLoginComponent,
        canActivate:[ConfirmLoginGuardService],
        data: {
          title: 'Confirm Login Page',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
