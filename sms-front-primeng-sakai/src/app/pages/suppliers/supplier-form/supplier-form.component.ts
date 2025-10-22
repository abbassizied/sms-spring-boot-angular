import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { SupplierService } from '../../../_services/supplier.service';
// import { SupplierFormData } from '../../../_models/supplier-form-data';
import { map } from 'rxjs';

import { InputNumber } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { delay } from 'rxjs';

interface UploadEvent {
    originalEvent: Event;
    files: File[];
}

@Component({
    selector: 'app-supplier-form',
    imports: [CommonModule, ReactiveFormsModule, RouterLink, InputNumber, InputTextModule, TextareaModule, FileUpload, ToastModule, ButtonModule, Message, CardModule],
    providers: [MessageService],
    templateUrl: './supplier-form.component.html',
    styleUrl: './supplier-form.component.scss'
})
export class SupplierFormComponent {
    private readonly fb = inject(FormBuilder);
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly supplierService = inject(SupplierService);
    private readonly messageService = inject(MessageService); // Injecting MessageService

    supplierId = toSignal(this.route.params.pipe(map((params) => (params['id'] ? +params['id'] : null))));
    isEditMode = computed(() => !!this.supplierId());
    existingLogoUrl = signal<string | undefined>(undefined);
    submitted = signal(false);

    selectedFile = signal<File | null>(null);
    logoRequiredError = computed(() => this.submitted() && !this.isEditMode() && !this.selectedFile() && !this.existingLogoUrl());

    supplierForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: [null as string | null, Validators.required],
        address: ['', Validators.required],
        logoUrl: [null as File | null]
    });

    ngOnInit() {
        if (this.isEditMode() && this.supplierId()) {
            this.supplierService.getSupplier(this.supplierId()!).subscribe((supplier) => {
                this.existingLogoUrl.set(supplier.logoUrl);
                this.supplierForm.patchValue({
                    name: supplier.name,
                    email: supplier.email,
                    phone: supplier.phone,
                    address: supplier.address
                });
            });
        }
    }

    onFileChange(event: any) {
        const file = event.files?.[0] ?? null;
        this.selectedFile.set(file);
        this.supplierForm.patchValue({ logoUrl: file });
    }

    onSubmit() {
        this.submitted.set(true);

        // Validate logo only if required
        if (this.logoRequiredError()) return;

        if (this.supplierForm.valid) {
            const formValue = this.supplierForm.value;

            // Construct JSON string from form values
            const supplierJson = JSON.stringify({
                name: formValue.name!,
                email: formValue.email!,
                phone: formValue.phone!,
                address: formValue.address!
            });

            const formData = new FormData();
            formData.append('supplier', supplierJson); // key must exactly be 'supplier'

            // Append logo file if selected
            const file = this.selectedFile();
            if (file) {
                formData.append('logoUrl', file);
            }

            // Determine create vs update
            const save$ = this.isEditMode() ? this.supplierService.updateSupplier(this.supplierId()!, formData) : this.supplierService.createSupplier(formData);

            save$.subscribe({
                next: () => {
                    // Display success toast
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Supplier saved successfully!'
                    });

                    // Wait for the toast to appear, then redirect to the supplier list
                    setTimeout(() => {
                        this.router.navigate(['/pages/suppliers']);
                    }, 1500); // 1500ms delay, adjust as needed
                },
                error: (err) => {
                    console.error('Error saving supplier:', err);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'An error occurred while saving the supplier.',
                        life: 3000
                    });
                }
            });
        }
    }

    /*
    onSubmit() {
        this.submitted.set(true);

        //logo validation before submission
        if (this.logoRequiredError()) return;

        if (this.supplierForm.valid) {
            const formValue = this.supplierForm.value;
            const formData: SupplierFormData = {
                id: this.isEditMode() ? this.supplierId()! : undefined,
                name: formValue.name!,
                email: formValue.email!,
                phone: formValue.phone!,
                address: formValue.address ?? undefined,
                logoUrl: formValue.logoUrl ?? undefined
            };

            this.supplierService.save(formData).subscribe({
                next: () => {
                    this.router.navigate(['/suppliers']);
                },
                error: (err) => {
                    console.error('Error saving supplier:', err);
                }
            });
        }
    }
*/
}
