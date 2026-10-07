import { http, HttpResponse } from 'msw';

import { env } from '@/config/env';

import type { AuthenticatedUser } from '@/features/auth/types/auth';

const authenticatedUser: AuthenticatedUser = {
  id: 1,
  name: 'Administrador',
  email: 'admin@example.com',
  role: {
    name: 'administrador',
  },
};

export const handlers = [
  http.get(`${env.apiUrl}/sanctum/csrf-cookie`, () => {
    return new HttpResponse(null, {
      status: 204,
    });
  }),

  http.post(`${env.apiUrl}/api/v1/auth/login`, async () => {
    return HttpResponse.json({
      success: true,
      message: 'Login successful.',
      data: authenticatedUser,
      errors: [],
    });
  }),

  http.get(`${env.apiUrl}/api/v1/auth/me`, () => {
    return HttpResponse.json({
      success: true,
      message: 'Authenticated user.',
      data: authenticatedUser,
      errors: [],
    });
  }),

  http.post(`${env.apiUrl}/api/v1/auth/logout`, () => {
    return new HttpResponse(null, {
      status: 204,
    });
  }),
];
