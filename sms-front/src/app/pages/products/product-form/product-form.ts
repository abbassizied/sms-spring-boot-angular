import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product } from '../../../_models/product';
import { ProductService } from '../../../_services/product';
import { SupplierService } from '../../../_services/supplier';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);
  private readonly supplierService = inject(SupplierService);

  // Convert the observable to a signal
  suppliers = toSignal(this.supplierService.getSuppliers(), {
    initialValue: [],
  });

  isEditMode = signal(false);
  productId = signal<number | null>(null);
  existingProduct = signal<Product | null>(null);
  mainImagePreview = signal<string | null>(null);
  imagePreviews = signal<string[]>([]);


  productForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    price: [0, [Validators.required, Validators.min(0)]],
    quantity: [0, [Validators.required, Validators.min(0)]],
    supplierId: [0, [Validators.required, Validators.min(1)]],
    mainImage: null as File | null,
    images: null as File[] | null,
  });

  constructor() {
    // You can access suppliers as a signal now
    console.log('Initial suppliers:', this.suppliers());
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.productId.set(+id);
      this.isEditMode.set(true);
      this.loadProduct(this.productId()!);
    }
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.existingProduct.set(product);
        this.mainImagePreview.set(product.mainImage ?? null);
        this.imagePreviews.set(product.images || []);
        this.productForm.patchValue({
          name: product.name,
          description: product.description,
          price: product.price,
          quantity: product.quantity,
          supplierId: product.supplierId,
        });
      },
      error: () => {
        // Handle navigation promise properly
        this.router
          .navigate(['/products'])
          .catch((err) => console.error('Navigation failed:', err));
      },
    });
  }

  // Update onImagesChange handler
  onImagesChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files) {
      this.productForm.patchValue({ images: Array.from(files) });
      this.generatePreviews(Array.from(files));
    }
  }

  private generateMainPreview(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.mainImagePreview.set(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  private generateAdditionalPreview(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviews.update((previews) => [...previews, reader.result as string]);
    };
    reader.readAsDataURL(file);
  }

  // Update the calls in event handlers:
  onMainImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.productForm.patchValue({ mainImage: file });
      this.generateMainPreview(file); // Changed to specific method
    }
  }

  private generatePreviews(files: File[]): void {
    this.imagePreviews.set([]);
    // Replace forEach with for...of
    for (const file of files) {
      this.generateAdditionalPreview(file);
    }
  }

  // Add this method to your ProductForm class
  removeImage(index: number): void {
    this.imagePreviews.update((previews) => previews.filter((_, i) => i !== index));

    // Also update the form control if needed
    const currentImages = this.productForm.get('images')?.value;
    if (currentImages && Array.isArray(currentImages)) {
      const updatedImages = currentImages.filter((_, i) => i !== index);
      this.productForm.patchValue({ images: updatedImages });
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;

      // Construct JSON string from form values matching Spring Boot endpoint
      const productJson = JSON.stringify({
        name: formValue.name!,
        description: formValue.description!,
        price: formValue.price!,
        quantity: formValue.quantity!,
        supplierId: formValue.supplierId!,
      });

      const formData = new FormData();
      formData.append('product', productJson); // key must be 'product' as per Spring Boot

      // Debug FormData before sending
      console.log('FormData contents before append:');
      for (let pair of (formData as any).entries()) {
        console.log(pair[0] + ': ', pair[1]);
      }

      // Append main image file if selected
      const mainImageFile = formValue?.mainImage;
      if (mainImageFile) {
        formData.append('mainImage', mainImageFile);   // key must be 'mainImage' as per Spring Boot
      }

      // Append additional images if they exist
      const additionalImages = formValue?.images;
      if (additionalImages) {
        for (const image of additionalImages) {
          formData.append('images', image);
        }
      }

      // Debug FormData after append
      console.log('FormData contents after append:');
      for (let pair of (formData as any).entries()) {
        console.log(pair[0] + ': ', pair[1]);
      }

      // Send request
      // Determine create vs update
      const save$ = this.isEditMode()
        ? this.productService.updateProduct(Number(this.productId()!), formData)
        : this.productService.createProduct(formData);

      save$.subscribe({
        next: () => {
          this.router
            .navigate(['/products'])
            .catch((err) => console.error('Navigation failed:', err));
        },
        error: (err) => console.error('Error saving product:', err),
      });
    }
  }
}
