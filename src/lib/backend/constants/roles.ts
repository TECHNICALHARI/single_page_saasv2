export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  SUPERADMIN: 'superadmin',
} as const;

export type Role = keyof typeof ROLES;
