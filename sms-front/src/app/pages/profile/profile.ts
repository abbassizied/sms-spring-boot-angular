import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth';
import { User } from '../../_models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  private readonly authService = inject(AuthService);
  currentUser: User | null = null;

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }

  
}
