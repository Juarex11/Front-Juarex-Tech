import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';

import { env } from '@/config/env';
import { server } from '@/test/mocks/server';

import { getCsrfCookie, getCurrentUser, login, logout } from './auth-service';

describe('getCsrfCookie', () => {
  it('completes successfully', async () => {
    await expect(getCsrfCookie()).resolves.toBeUndefined();
  });
});

describe('login', () => {
  it('returns the authenticated user', async () => {
    const user = await login({
      email: 'admin@example.com',
      password: 'password',
    });

    expect(user).toEqual({
      id: 1,
      name: 'Administrador',
      email: 'admin@example.com',
      role: {
        name: 'administrador',
      },
    });
  });

  it('throws when the credentials are incorrect', async () => {
    server.use(
      http.post(`${env.apiUrl}/api/v1/auth/login`, () => {
        return HttpResponse.json(
          {
            success: false,
            message: 'The provided credentials are incorrect.',
            data: null,
            errors: [],
          },
          { status: 401 },
        );
      }),
    );

    await expect(
      login({
        email: 'admin@example.com',
        password: 'pasrd',
      }),
    ).rejects.toMatchObject({
      response: {
        status: 401,
        data: {
          success: false,
          message: 'The provided credentials are incorrect.',
          data: null,
          errors: [],
        },
      },
    });
  });
});

describe('getCurrentUser', () => {
  it('returns the authenticated user', async () => {
    const user = await getCurrentUser();

    expect(user).toEqual({
      id: 1,
      name: 'Administrador',
      email: 'admin@example.com',
      role: {
        name: 'administrador',
      },
    });
  });

  it('throws when the user is not authenticated', async () => {
    server.use(
      http.get(`${env.apiUrl}/api/v1/auth/me`, () => {
        return HttpResponse.json(
          {
            success: false,
            message: 'Unauthenticated.',
            data: null,
            errors: [],
          },
          { status: 401 },
        );
      }),
    );

    await expect(getCurrentUser()).rejects.toMatchObject({
      response: {
        status: 401,
        data: {
          success: false,
          message: 'Unauthenticated.',
          data: null,
          errors: [],
        },
      },
    });
  });
});

describe('logout', () => {
  it('completes successfully', async () => {
    await expect(logout()).resolves.toBeUndefined();
  });
});
