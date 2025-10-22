// product-detail.component.ts
import { Component, inject, signal, computed, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

// PrimeNG Modules
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { ImageModule } from 'primeng/image';

import { ProductService } from '../../../_services/product.service';
import type { Product } from '../../../_models/product';

@Component({
    selector: 'app-product-detail',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        DatePipe,
        ProgressSpinnerModule,
        MessageModule,
        ButtonModule,
        CardModule,
        FieldsetModule,
        ImageModule
    ],
    templateUrl: './product-detail.component.html',
    styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
    private readonly route = inject(ActivatedRoute);
    private readonly productService = inject(ProductService);

    // Reactive state with signals
    product = signal<Product | undefined>(undefined);
    isLoading = signal(true);
    error = signal<string | undefined>(undefined);

    // Get route params as signal
    private readonly params = toSignal(this.route.params);

    // Compute ID from route params
    private readonly idSignal = computed(() => {
        const params = this.params();
        return params ? Number(params['id']) : null;
    });

    constructor() {
        // Reactive data loading effect
        effect((onCleanup) => {
            const id = this.idSignal();
            if (!id) return;

            this.isLoading.set(true);
            this.error.set(undefined);

            const sub = this.productService.getProduct(id).subscribe({
                next: (data) => {
                    this.product.set(data);
                    this.isLoading.set(false);
                },
                error: (err) => {
                    this.error.set(err.message ?? 'Failed to load product details');
                    this.isLoading.set(false);
                }
            });

            onCleanup(() => sub.unsubscribe());
        });
    }
}