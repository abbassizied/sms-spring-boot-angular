export class RoleUtils {
  static normalizeRole(role: string): string {
    return role.replace(/^ROLE_/, '').toLowerCase();
  }

  static normalizeRoles(roles: string[]): string[] {
    return roles.map((role) => this.normalizeRole(role));
  }

  static hasAnyRole(userRoles: string[], requiredRoles: string[]): boolean {
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    if (!userRoles || userRoles.length === 0) {
      return false;
    }

    const normalizedUserRoles = this.normalizeRoles(userRoles);
    const normalizedRequiredRoles = this.normalizeRoles(requiredRoles);

    return normalizedUserRoles.some((userRole) => normalizedRequiredRoles.includes(userRole));
  }
}
