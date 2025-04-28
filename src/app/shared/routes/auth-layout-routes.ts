import { Routes } from '@angular/router';


export const  Auth_ROUTES: Routes = [
  {
    path: 'dawana/auth',
    loadChildren: () =>
      import('../../auth/auth.module').then(
        (m) => m.AuthModule
      ),
  },
];
