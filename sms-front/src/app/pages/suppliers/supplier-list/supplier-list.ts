import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SupplierService } from '../../../_services/supplier';
import { Supplier } from '../../../_models/supplier';

@Component({
  selector: 'app-supplier-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './supplier-list.html',
  styleUrl: './supplier-list.css'
})
export class SupplierList implements OnInit {

  private readonly supplierService = inject(SupplierService);
  // Inject Router using inject() function
  private readonly router = inject(Router);

  // Reactive state with signals
  suppliers = signal<Supplier[]>([]);

  ngOnInit(): void {
    console.log('Initialized');
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.supplierService.getSuppliers().subscribe({
      next: (data) => this.suppliers.set(data),
      error: (err) => console.error('Failed to load suppliers:', err)
    });
  }

  deleteSupplier(id: number) {
    if (confirm('Are you sure you want to delete this supplier?')) {
      this.supplierService.deleteSupplier(id).subscribe({
        next: () => this.loadSuppliers(),
        error: (err) => console.error('Failed to delete supplier:', err)
      });
    }
  }

  navigateToNewSupplier() {
    this.router.navigate(['/suppliers/new']);
  }
}
