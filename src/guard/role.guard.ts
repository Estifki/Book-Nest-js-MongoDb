// role.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/utils/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRoles) {
      return true; // No role specified on the route, allow access.
    }

    const request = context.switchToHttp().getRequest();
    // console.log(request);
    const userRole: Role = request.user?.role; // Assuming you store the user object on the request during authentication.
    if (requiredRoles.includes(userRole)) {
      return true; // User has the required role, allow access
    }

    return false; // User doesn't have the required role, deny access.
  }
}