import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';

const routes: Routes = [
  { path: '', component: SupplierListComponent }, // List suppliers
  { path: 'new', component: SupplierFormComponent }, // Create supplier
  { path: 'edit/:id', component: SupplierFormComponent }, // Edit supplier
  { path: 'view/:id', component: SupplierDetailComponent } // View supplier details
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule { }
