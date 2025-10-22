import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SupplierService } from '../../../_services/supplier';
import { SupplierFormData } from '../../../_models/supplier-form-data';

@Component({
  selector: 'app-supplier-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './supplier-form.html',
  styleUrl: './supplier-form.css'
})
export class SupplierForm implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly supplierService = inject(SupplierService);

  supplierId = signal<number | null>(null);
  isEditMode = computed(() => !!this.supplierId());
  existingLogoUrl = signal<string | undefined>(undefined);
  isSubmitting = signal(false);

  supplierForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    address: [''],
    logoUrl: [null as File | null]
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.supplierId.set(id);
      this.loadSupplier(id);
    }
  }

  private loadSupplier(id: number): void {
    this.supplierService.getSupplier(id).subscribe({
      next: (supplier) => {
        this.existingLogoUrl.set(supplier.logoUrl);
        this.supplierForm.patchValue({
          name: supplier.name,
          email: supplier.email,
          phone: supplier.phone,
          address: supplier.address || ''
        });
      },
      error: (err) => console.error('Failed to load supplier:', err)
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;
    this.supplierForm.patchValue({ logoUrl: file });
  }

  onSubmit(): void {
    if (this.supplierForm.valid) {
      this.isSubmitting.set(true);

      const formValue = this.supplierForm.value;
      const formData: SupplierFormData = {
        id: this.supplierId() || undefined,
        name: formValue.name!,
        email: formValue.email!,
        phone: formValue.phone!,
        address: formValue.address || undefined,
        logoUrl: formValue.logoUrl || undefined
      };

      this.supplierService.save(formData).subscribe({
        next: () => this.router.navigate(['/suppliers']),
        error: (err) => {
          console.error('Error saving supplier:', err);
          this.isSubmitting.set(false);
        },
        complete: () => this.isSubmitting.set(false)
      });
    }
  }
}
