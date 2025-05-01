import { Component, inject, signal, computed, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router'; // Add RouterModule

import { CommonModule } from '@angular/common';

// PrimeNG Modules
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { Image } from 'primeng/image';

import { SupplierService } from '../../../_services/supplier.service';
import type { Supplier } from '../../../_models/supplier';

@Component({
    selector: 'app-supplier-detail',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        // PrimeNG Modules
        ProgressSpinnerModule,
        MessageModule,
        ButtonModule,
        CardModule,
        FieldsetModule,
        PanelModule,
        Image
    ],
    templateUrl: './supplier-detail.component.html',
    styleUrl: './supplier-detail.component.scss'
})
export class SupplierDetailComponent {
    private readonly route = inject(ActivatedRoute);
    private readonly supplierService = inject(SupplierService);

    // Reactive state with signals
    supplier = signal<Supplier | undefined>(undefined);
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

            const sub = this.supplierService.getSupplier(id).subscribe({
                next: (data) => {
                    this.supplier.set(data);
                    this.isLoading.set(false);
                },
                error: (err) => {
                    this.error.set(err.message ?? 'Failed to load supplier details');
                    this.isLoading.set(false);
                }
            });

            onCleanup(() => sub.unsubscribe());
        });
    }
}
