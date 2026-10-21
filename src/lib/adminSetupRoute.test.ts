import { describe, expect, it } from 'vitest';

import { isAdminSetupRoute } from './adminSetupRoute';

const gesperrt = [
  '/api/users/first-register',
  '/api/users/first%2Dregister',
  '/api/users/first%2dregister',
  '/api/users/first%252Dregister',
  '/API/Users/First-Register',
  '/api/users//first-register',
  '/api/users/first-register/',
  '//admin//create-first-user//',
  '/admin/create%2Dfirst%2Duser',
  '/admin/Create-First-User',
  '/api/users/first-register%2F',
  '/api/users/%E0%A4%A',
];

const offen = [
  '/',
  '/admin',
  '/admin/login',
  '/api/users/login',
  '/api/users/me',
  '/api/users/first-register-x',
  '/admin/create-first-user-x',
  '/kontakt',
];

describe('isAdminSetupRoute', () => {
  it.each(gesperrt)('sperrt %s', (path) => {
    expect(isAdminSetupRoute(path)).toBe(true);
  });

  it.each(offen)('laesst %s durch', (path) => {
    expect(isAdminSetupRoute(path)).toBe(false);
  });
});
