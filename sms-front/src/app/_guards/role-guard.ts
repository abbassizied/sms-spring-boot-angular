import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../_services/auth';
import { RoleUtils } from '../_utils/role.utils';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredRoles = route.data['roles'] as string[];
  const user = authService.getCurrentUser();
  const userRoles = user?.roles || [];

  // Enhanced debugging
  console.group('🔐 ROLE GUARD DEBUG');
  console.log('Required roles:', requiredRoles);
  console.log('Is authenticated:', authService.isAuthenticated());
  console.log('Current user:', user);
  console.log('User roles:', userRoles);
  console.log('Has any role (RoleUtils):', RoleUtils.hasAnyRole(userRoles, requiredRoles));

  // Debug role mapping
  if (userRoles.length > 0 && requiredRoles) {
    console.log('Role mapping:');
    userRoles.forEach((userRole) => {
      const normalized = RoleUtils.normalizeRole(userRole);
      requiredRoles.forEach((reqRole) => {
        const normReq = RoleUtils.normalizeRole(reqRole);
        console.log(
          `  ${userRole} -> ${normalized} vs ${reqRole} -> ${normReq}: ${
            normalized === normReq ? '✅' : '❌'
          }`
        );
      });
    });
  }
  console.groupEnd();

  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }

  // Use RoleUtils directly for the access check
  if (authService.isAuthenticated() && RoleUtils.hasAnyRole(userRoles, requiredRoles)) {
    console.log('✅ Role guard passed');
    return true;
  }

  console.log('❌ Role guard failed - redirecting to unauthorized');
  router.navigate(['/unauthorized']);
  return false;
};
