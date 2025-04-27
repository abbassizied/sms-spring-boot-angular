import { Routes } from '@angular/router'; 
import { Empty } from './empty/empty';

export default [ 
    { path: 'suppliers', loadChildren: () => import('./suppliers/suppliers.module').then(m => m.SuppliersModule) },
    { path: 'empty', component: Empty },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
