import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        // Auto logout if 401 response returned from api
        authService.logout();
        router.navigate(['/login']);
      }

      if (error.status === 403) {
        // Handle forbidden access
        console.error('Access forbidden:', error);
        // You can show a notification or redirect to a forbidden page
      }

      const errorMessage = error.error?.message || error.statusText;
      return throwError(() => error);
    })
  );
};
