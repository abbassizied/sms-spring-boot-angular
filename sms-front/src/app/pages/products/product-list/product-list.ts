import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Product } from '../../../_models/product';
import { ProductService } from '../../../_services/product';
import { Pagination } from "../../../components/pagination/pagination";
import { PageResponse } from '../../../_models/pagination.interface';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, Pagination],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {

  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);

  products = signal<Product[]>([]);

  page = 0;
  size = 10;
  totalPages = 1;
  totalElements = 0;

  ngOnInit(): void {
    this.loadProducts(this.page, this.size);
  }

  loadProducts(page: number = this.page, size: number = this.size) {
    console.log('Loading products with:', { page, size });

    this.productService.getProducts(page, size).subscribe({
      /*
      next: (data) => {
        console.log('API Response:', data);
        console.log('Is Array?', Array.isArray(data));
        console.log('Type:', typeof data);
        this.products.set(Array.isArray(data) ? data : []);
      }*/
      next: (res: PageResponse<Product>) => {// Use the PageResponse interface
        // Use signal's set method, not direct assignment
        console.log('API Response:', res);
        this.products.set(res.content);
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
        this.page = res.number;
        this.size = res.size;
      }
      ,
      error: (err) => {
        /*
              console.error('Full error details:', err);
              console.error('Error status:', err.status);
              console.error('Error message:', err.message);
              console.error('Error URL:', err.url);
        */
        console.error('Error loading products:', err);
        this.products.set([]);
      },
    });
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => this.loadProducts(this.page, this.size),
        error: (err) => console.error('Error deleting product:', err),
      });
    }
  }

  navigateToNewProduct() {
    this.router.navigate(['/products/new']);
  }

  onPageChange(page: number) {
    this.loadProducts(page, this.size);
  }
}
