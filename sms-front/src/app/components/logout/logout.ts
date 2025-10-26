import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logout.html',
  styleUrl: './logout.css',
})
export class Logout implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  ngOnInit() {
    this.performLogout();
  }

  private performLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
