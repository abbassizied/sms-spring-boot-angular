import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
    { path: '', component: ProductListComponent }, // List products
    { path: 'new', component: ProductFormComponent }, // Create product
    { path: 'edit/:id', component: ProductFormComponent }, // Edit product
    { path: 'view/:id', component: ProductDetailComponent } // View product details
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
