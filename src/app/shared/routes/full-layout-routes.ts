import { Routes} from '@angular/router';


export const Full_ROUTES: Routes = [
  {
    path: 'dawana/pages',
    loadChildren: () =>
      import('../../pages/pages.module').then((m) => m.PagesModule),
  },
];
