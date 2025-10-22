import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductList } from './product-list/product-list';
import { ProductDetail } from './product-detail/product-detail';
import { ProductForm } from './product-form/product-form';

const routes: Routes = [
  { path: '', component: ProductList }, // List products
  { path: 'new', component: ProductForm }, // Create product
  { path: 'edit/:id', component: ProductForm }, // Edit product
  { path: 'view/:id', component: ProductDetail } // View product details  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
