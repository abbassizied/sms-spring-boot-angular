import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { NotFound } from './pages/not-found/not-found';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { AppLayout } from './layouts/app-layout/app-layout';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    {
        path: '',
        component: AppLayout,
        children: [

            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: Home },
            { path: 'suppliers', loadChildren: () => import('./pages/suppliers/suppliers-module').then(m => m.SuppliersModule) },
            { path: 'products', loadChildren: () => import('./pages/products/products-module').then(m => m.ProductsModule) },
        ]
    },
    { path: '**', component: NotFound }
];
