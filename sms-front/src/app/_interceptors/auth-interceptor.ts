import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../_services/auth';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  // Get the auth token from the service
  const authToken = authService.getToken();

  // Clone the request and add the authorization header if token exists
  if (authToken) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`),
    });
    return next(authReq);
  }

  // If no token, pass the original request
  return next(req);
};
