// product-form.component.ts
import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../../_services/product.service';
import { map } from 'rxjs';

import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'app-product-form',
    standalone: true,
    imports: [
        CommonModule, 
        ReactiveFormsModule, 
        RouterLink, 
        InputNumberModule, 
        InputTextModule, 
        TextareaModule, 
        FileUploadModule, 
        ToastModule, 
        ButtonModule, 
        MessageModule, 
        CardModule
    ],
    templateUrl: './product-form.component.html',
    styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
    private readonly fb = inject(FormBuilder);
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly productService = inject(ProductService);
    private readonly messageService = inject(MessageService);

    productId = toSignal(this.route.params.pipe(map((params) => (params['id'] ? params['id'] : null))));
    isEditMode = computed(() => !!this.productId());
    existingImageUrl = signal<string | undefined>(undefined);
    submitted = signal(false);

    selectedFile = signal<File | null>(null);
    imageRequiredError = computed(() => this.submitted() && !this.isEditMode() && !this.selectedFile() && !this.existingImageUrl());

    productForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        price: [0, [Validators.required, Validators.min(0)]],
        quantity: [0, [Validators.required, Validators.min(0)]],
        supplierId: [0, [Validators.required, Validators.min(1)]]
    });

    ngOnInit() {
        if (this.isEditMode() && this.productId()) {
            this.productService.getProduct(Number(this.productId()!)).subscribe((product) => {
                this.existingImageUrl.set(product.image);
                this.productForm.patchValue({
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    quantity: product.quantity,
                    supplierId: product.supplierId
                });
            });
        }
    }

    onFileChange(event: any) {
        const file = event.files?.[0] ?? null;
        this.selectedFile.set(file);
    }

    onSubmit() {
        this.submitted.set(true);

        // Validate image only if required (for new products)
        if (this.imageRequiredError()) return;

        if (this.productForm.valid) {
            const formValue = this.productForm.value;

            // Construct JSON string from form values matching Spring Boot endpoint
            const productJson = JSON.stringify({
                name: formValue.name!,
                description: formValue.description!,
                price: formValue.price!,
                quantity: formValue.quantity!,
                supplierId: formValue.supplierId!
            });

            const formData = new FormData();
            formData.append('product', productJson); // key must be 'product' as per Spring Boot

            // Append main image file if selected
            const file = this.selectedFile();
            if (file) {
                formData.append('mainImage', file); // key must be 'mainImage' as per Spring Boot
            }

            // Determine create vs update
            const save$ = this.isEditMode() 
                ? this.productService.updateProduct(Number(this.productId()!), formData)
                : this.productService.createProduct(formData);

            save$.subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: `Product ${this.isEditMode() ? 'updated' : 'created'} successfully!`
                    });

                    setTimeout(() => {
                        this.router.navigate(['/pages/products']);
                    }, 1500);
                },
                error: (err) => {
                    console.error('Error saving product:', err);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'An error occurred while saving the product.',
                        life: 3000
                    });
                }
            });
        }
    }
}
