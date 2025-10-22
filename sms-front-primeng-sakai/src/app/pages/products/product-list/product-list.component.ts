// product-list.component.ts
import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table'; 
import { ToolbarModule } from 'primeng/toolbar';  
import { ConfirmDialogModule } from 'primeng/confirmdialog'; 
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';  

import { ProductService } from '../../../_services/product.service';
import { Product } from '../../../_models/product';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [ 
        CommonModule,
        RouterModule,
        TableModule,
        ToolbarModule,
        ButtonModule,
        ToastModule,
        ConfirmDialogModule,
        CurrencyPipe
    ],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.scss',
    providers: [ConfirmationService, MessageService],
})
export class ProductListComponent implements OnInit {
    private readonly productService = inject(ProductService);
    private readonly confirmationService = inject(ConfirmationService);
    private readonly messageService = inject(MessageService);

    // Reactive state with signals
    products = signal<Product[]>([]);

    ngOnInit(): void {
        this.loadProducts();
    }

    loadProducts(): void {
        this.productService.getProducts().subscribe({
            next: (data) => this.products.set(data),
            error: (err) => {
                console.error('Error loading products:', err);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to load products',
                });
            }
        });
    }

    deleteProduct(id: string): void {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this product?',
            header: 'Delete Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.productService.deleteProduct(Number(id)).subscribe({
                    next: () => {
                        this.loadProducts();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Product deleted successfully',
                            life: 3000,
                        });
                    },
                    error: (err) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Failed to delete product',
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
        const productsData = this.products().map(product => ({
            Name: product.name,
            Description: product.description,
            Price: product.price,
            Quantity: product.quantity,
            'Supplier ID': product.supplierId,
            'Created At': product.createdAt
        }));

        const worksheet = XLSX.utils.json_to_sheet(productsData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
        const excelBuffer: any = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array'
        });
        const blob = new Blob([excelBuffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        saveAs(blob, 'products.xlsx');
    }    
}