import { Routes } from '@angular/router';
import { NotFound } from './pages/not-found/not-found';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { AppLayout } from './layouts/app-layout/app-layout';
import { authGuard } from './_guards/auth-guard';
import { roleGuard } from './_guards/role-guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  {
    path: 'logout',
    loadComponent: () => import('./components/logout/logout').then((m) => m.Logout),
  },
  {
    path: '',
    component: AppLayout,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home').then((m) => m.Home),
        canActivate: [authGuard],
      },
      {
        path: 'admin',
        loadComponent: () => import('./pages/admin/admin').then((m) => m.Admin),
        canActivate: [authGuard, roleGuard],
        data: { roles: ['admin', 'super_admin'] },
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile').then((m) => m.Profile),
        canActivate: [authGuard],
      },
      {
        path: 'suppliers',
        loadChildren: () =>
          import('./pages/suppliers/suppliers-module').then((m) => m.SuppliersModule),
        canActivate: [authGuard],
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./pages/products/products-module').then((m) => m.ProductsModule),
        canActivate: [authGuard],
      },
    ],
  },
  { path: '**', component: NotFound },
];
