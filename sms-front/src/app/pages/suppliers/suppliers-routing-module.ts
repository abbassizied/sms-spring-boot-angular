import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierList } from './supplier-list/supplier-list';
import { SupplierForm } from './supplier-form/supplier-form';
import { SupplierDetail } from './supplier-detail/supplier-detail';

const routes: Routes = [
  { path: '', component: SupplierList }, // List suppliers
  { path: 'new', component: SupplierForm }, // Create supplier
  { path: 'edit/:id', component: SupplierForm }, // Edit supplier
  { path: 'view/:id', component: SupplierDetail } // View supplier details  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule { }
