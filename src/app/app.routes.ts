import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./home/home').then((m) => m.HomeComponent),
  },
  {
    path: 'view-project/:id',
    loadComponent: () =>
      import('./segments/view-project/view-project').then((m) => m.ViewProjectComponent),
  },
  //{ path: '**', redirectTo: 'home' },
];
