import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SupplierService } from '../../../_services/supplier';
import { Supplier } from '../../../_models/supplier';
import { Pagination } from '../../../components/pagination/pagination';
import { PageResponse } from '../../../_models/pagination.interface';

@Component({
  selector: 'app-supplier-list',
  standalone: true,
  imports: [CommonModule, RouterModule, Pagination],
  templateUrl: './supplier-list.html',
  styleUrl: './supplier-list.css',
})
export class SupplierList implements OnInit {
  private readonly supplierService = inject(SupplierService);
  // Inject Router using inject() function
  private readonly router = inject(Router);

  // Use explicit typing
  suppliers = signal<Supplier[]>([]);

  page = 0;
  size = 10;
  totalPages = 1;
  totalElements = 0;

  ngOnInit(): void {
    console.log('Initialized');
    this.loadSuppliers(this.page, this.size);
  }

  loadSuppliers(page: number = this.page, size: number = this.size) {
    console.log('Loading suppliers with:', { page, size });

    this.supplierService.getSuppliersWithPagination(page, size).subscribe({
      next: (res: PageResponse<Supplier>) => {
        console.log('API Response:', res);
        console.log('Response content:', res.content);

        this.suppliers.set(res.content);
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
        this.page = res.number;
        this.size = res.size;

        console.log('Suppliers after set:', this.suppliers());
      },
      error: (err) => {
        console.error('Failed to load suppliers:', err);
        this.suppliers.set([]);
      },
    });
  }

  deleteSupplier(id: number) {
    if (confirm('Are you sure you want to delete this supplier?')) {
      this.supplierService.deleteSupplier(id).subscribe({
        next: () => this.loadSuppliers(this.page, this.size),
        error: (err) => console.error('Failed to delete supplier:', err),
      });
    }
  }

  navigateToNewSupplier() {
    this.router.navigate(['/suppliers/new']);
  }

  onPageChange(page: number) {
    console.log('Page changed to:', page);
    this.loadSuppliers(page, this.size);
  }
}
