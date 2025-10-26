import { Component, inject } from '@angular/core';
import { AuthService } from '../../_services/auth';
import { User } from '../../_models/user.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  private readonly authService = inject(AuthService);
  currentUser: User | null = null;
}
