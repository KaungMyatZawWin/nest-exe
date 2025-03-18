import { SetMetadata } from '@nestjs/common';
import { UserRoles } from '../enums/role.enum';

export const ROLE_KEY = 'roles';
export const Roles = (...roles: UserRoles[]) => SetMetadata(ROLE_KEY, roles);
