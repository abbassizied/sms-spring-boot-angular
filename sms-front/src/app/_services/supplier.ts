import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Supplier } from '../_models/supplier';
import { environment } from '../../environments/environment';
import { PageResponse } from '../_models/pagination.interface';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  private readonly apiUrl = `${environment.apiUrl}/suppliers`;
  private readonly http = inject(HttpClient);

  constructor() {
    console.log('SupplierService constructor called');
    console.trace(); // This will show where it's being instantiated from
  }

  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.apiUrl);
  }

  getSuppliersWithPagination(page: number, size: number): Observable<PageResponse<Supplier>> {
    return this.http.get<Supplier[]>(`${this.apiUrl}`).pipe(
      map((suppliers: Supplier[]) => {
        // Client-side pagination
        const startIndex = page * size;
        const endIndex = startIndex + size;
        const paginatedSuppliers = suppliers.slice(startIndex, endIndex);

        return {
          content: paginatedSuppliers,
          totalElements: suppliers.length,
          totalPages: Math.ceil(suppliers.length / size),
          number: page,
          size: size,
          numberOfElements: paginatedSuppliers.length,
          first: page === 0,
          last: endIndex >= suppliers.length,
          empty: paginatedSuppliers.length === 0,
        };
      })
    );
  }

  getSupplier(id: number): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.apiUrl}/${id}`);
  }

  deleteSupplier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  createSupplier(data: FormData): Observable<Supplier> {
    return this.http.post<Supplier>(this.apiUrl, data);
  }

  updateSupplier(id: number, data: FormData): Observable<Supplier> {
    return this.http.put<Supplier>(`${this.apiUrl}/${id}`, data);
  }
}
