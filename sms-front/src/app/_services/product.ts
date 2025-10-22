import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../_models/product';
import { ProductFormData } from '../_models/product-form-data';
import { PageResponse } from '../_models/pagination.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apiUrl = `${environment.apiUrl}/products`;
  private readonly http = inject(HttpClient);

  getProducts(page: number = 0, size: number = 10): Observable<PageResponse<Product>> {
    return this.http.get<PageResponse<Product>>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: ProductFormData): Observable<Product> {
    const formData = this.createFormData(product);
    return this.http.post<Product>(this.apiUrl, formData);
  }

  updateProduct(id: number, product: ProductFormData): Observable<Product> {
    const formData = this.createFormData(product);
    return this.http.put<Product>(`${this.apiUrl}/${id}`, formData);
  }
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private createFormData(data: ProductFormData): FormData {
    const formData = new FormData();

    if (data.id) formData.append('id', data.id.toString());
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    formData.append('quantity', data.quantity.toString());
    formData.append('supplierId', data.supplierId.toString());

    if (data.mainImageUrl) {
      formData.append('mainImageUrl', data.mainImageUrl);
    }

    if (data.imagesUrl) {
      for (const image of data.imagesUrl) {
        formData.append('imagesUrl', image);
      }
    }

    return formData;
  }
}