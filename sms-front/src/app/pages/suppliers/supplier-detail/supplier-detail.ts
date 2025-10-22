import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SupplierService } from '../../../_services/supplier';
import { Supplier } from '../../../_models/supplier';

@Component({
  selector: 'app-supplier-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './supplier-detail.html',
  styleUrl: './supplier-detail.css'
})
export class SupplierDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly supplierService = inject(SupplierService);

  supplier = signal<Supplier | undefined>(undefined);
  isLoading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadSupplier();
  }

  private loadSupplier(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.error.set('Invalid supplier ID');
      this.isLoading.set(false);
      return;
    }

    this.supplierService.getSupplier(id).subscribe({
      next: (data) => {
        this.supplier.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Supplier not found');
        this.isLoading.set(false);
      }
    });
  }
}
