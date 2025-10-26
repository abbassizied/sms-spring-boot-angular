import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './_services/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('sms-front');

  private readonly authService = inject(AuthService);

  ngOnInit() {
    // Initialize authentication state when app starts
    this.authService.initializeAuthState();
  }
}
