import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../_models/user.model';
import { LoginRequest } from '../_models/login-request.model';
import { AuthResponse } from '../_models/auth-response.model';
import { RegisterRequest } from '../_models/register-request.model';
import { RoleUtils } from '../_utils/role.utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/auth`;
  private readonly tokenKey = 'auth_token';
  private readonly userKey = 'current_user';

  private readonly currentUserSubject = new BehaviorSubject<User | null>(this.getStoredUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  /**
   * Login user
   */
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/signin`, credentials).pipe(
      tap((response) => {
        this.storeAuthData(response);
        const user = this.mapAuthResponseToUser(response);
        this.currentUserSubject.next(user);
      })
    );
  }

  /**
   * Register new user
   */
  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/signup`, userData).pipe(
      tap((response) => {
        this.storeAuthData(response);
        const user = this.mapAuthResponseToUser(response);
        this.currentUserSubject.next(user);
      })
    );
  }

  /**
   * Logout user
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUserSubject.next(null);
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Get JWT token
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    // Check if token is expired (basic check)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000; // Convert to milliseconds
      return Date.now() < exp;
    } catch (error) {
      console.warn('Invalid token format:', error);
      return false;
    }
  }

  /**
   * Check if user has specific role
   */
  hasRole(requiredRole: string): boolean {
    const user = this.getCurrentUser();
    return user ? user.roles.includes(requiredRole) : false;
  }

  /**
   * Check if user has any of the specified roles
   */
  hasAnyRole(requiredRoles: string[]): boolean {
    const user = this.getCurrentUser();
    return RoleUtils.hasAnyRole(user?.roles || [], requiredRoles);
  }

  /**
   * Refresh user data from stored token
   */
  refreshUserData(): void {
    const token = this.getToken();
    const user = this.getStoredUser();

    if (token && user && this.isAuthenticated()) {
      this.currentUserSubject.next(user);
    } else {
      this.logout();
    }
  }

  /**
   * Initialize authentication state on app start
   */
  initializeAuthState(): void {
    this.refreshUserData();
  }

  /**
   * Store authentication data in localStorage
   */
  private storeAuthData(response: AuthResponse): void {
    localStorage.setItem(this.tokenKey, response.token);

    const user: User = this.mapAuthResponseToUser(response);
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  /**
   * Get stored user from localStorage
   */
  private getStoredUser(): User | null {
    try {
      const userStr = localStorage.getItem(this.userKey);
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error parsing stored user data:', error);
      return null;
    }
  }

  /**
   * Map AuthResponse to User
   */
  private mapAuthResponseToUser(response: AuthResponse): User {
    return {
      username: response.username,
      email: response.email,
      firstName: '', // You might need to adjust based on your backend response
      lastName: '', // You might need to adjust based on your backend response
      roles: response.roles,
    };
  }
}
