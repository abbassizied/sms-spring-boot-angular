import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Supplier } from '../_models/supplier';
/*
 import { SupplierFormData } from '../_models/supplier-form-data';
*/

@Injectable({
    providedIn: 'root'
})
export class SupplierService {
    private readonly apiUrl = `${environment.apiUrl}/suppliers`;
    private readonly http = inject(HttpClient);

    getSuppliers(): Observable<Supplier[]> {
        return this.http.get<Supplier[]>(this.apiUrl);
    }

    getSupplier(id: number): Observable<Supplier> {
        return this.http.get<Supplier>(`${this.apiUrl}/${id}`);
    }

    deleteSupplier(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    createSupplier(data: FormData) {
        return this.http.post<Supplier>('/api/suppliers', data);
    }

    updateSupplier(id: number, data: FormData) {
        return this.http.put<Supplier>(`/api/suppliers/${id}`, data);
    }

    /*
    save(supplierFormData: SupplierFormData): Observable<Supplier> {
        const formData = this.mapToFormData(supplierFormData);
        return supplierFormData.id ? this.http.put<Supplier>(`${this.apiUrl}/${supplierFormData.id}`, formData) : this.http.post<Supplier>(this.apiUrl, formData);
    }

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
