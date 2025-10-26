import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../_services/auth';
import { User } from '../../_models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  currentUser: User | null = null; 

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();

    // Redirect to login if not authenticated
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    // Navigate to logout page instead of direct logout
    this.router.navigate(['/logout']);
  }
}
