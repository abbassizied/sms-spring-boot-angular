import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supplier } from '../_models/supplier';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
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
  /*
    private mapToFormData(data: SupplierFormData): FormData {
      const formData = new FormData();
      if (data.id !== undefined && data.id !== null) {
        formData.append('id', String(data.id)); // Convert number to string
      }
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      if (data.address !== undefined && data.address !== null) {
        formData.append('address', data.address); // Ensure it's defined
      }
      if (data.logoUrl && data.logoUrl instanceof File) {
        formData.append('logoUrl', data.logoUrl);
      }
      return formData;
    }
      */
}