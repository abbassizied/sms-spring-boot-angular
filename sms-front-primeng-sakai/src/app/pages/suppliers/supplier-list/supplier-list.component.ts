import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table'; 
import { ToolbarModule } from 'primeng/toolbar';  
import { ConfirmDialogModule } from 'primeng/confirmdialog'; 
import { ToastModule } from 'primeng/toast';

import { ConfirmationService, MessageService } from 'primeng/api';  

import { SupplierService } from '../../../_services/supplier.service';
import { Supplier } from '../../../_models/supplier';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


@Component({
    selector: 'app-supplier-list',
    imports: [ 
        RouterModule,
        TableModule,
        ToolbarModule, // ✅ Fixed
        ButtonModule,
        ToastModule,
        ConfirmDialogModule, // ✅ Added
    ],
    templateUrl: './supplier-list.component.html',
    styleUrl: './supplier-list.component.scss',
    providers: [ConfirmationService, MessageService], // ✅ Required
})
export class SupplierListComponent implements OnInit {

    cols: { field: string, header: string }[] = [
        { field: 'name', header: 'Name' },
        { field: 'email', header: 'Email' },
        { field: 'phone', header: 'Phone' },
        { field: 'address', header: 'Address' }
    ];

    private readonly supplierService = inject(SupplierService);
    private readonly confirmationService = inject(ConfirmationService);
    private readonly messageService = inject(MessageService);

    // Reactive state with signals
    suppliers = signal<Supplier[]>([]);

    ngOnInit(): void {
        this.loadSuppliers();

    }

    loadSuppliers(): void {
        this.supplierService.getSuppliers().subscribe({
            next: (data) => {this.suppliers.set(data)},
            error: (err) =>
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to load suppliers',
                }),
        });
    }

    deleteSupplier(id: number): void {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this supplier?',
            header: 'Delete Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.supplierService.deleteSupplier(id).subscribe({
                    next: () => {
                        this.loadSuppliers();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Supplier deleted successfully',
                            life: 3000, // Toast duration
                        });
                    },
                    error: (err) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Failed to delete supplier',
                            life: 3000,
                        });
                    },
                });
            },
            reject: () => {
                // No action needed on reject
            },
        });
    }

    exportToExcel(): void {
        const suppliersData = this.suppliers();
        const worksheet = XLSX.utils.json_to_sheet(suppliersData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Suppliers');
        const excelBuffer: any = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array'
        });
        const blob = new Blob([excelBuffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        saveAs(blob, 'suppliers.xlsx');
    }    
}
