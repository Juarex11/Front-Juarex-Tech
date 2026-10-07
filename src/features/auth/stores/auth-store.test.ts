import { beforeEach, describe, expect, it } from 'vitest';

import { useAuthStore } from './auth-store';

const authenticatedUser = {
  id: 1,
  name: 'Administrador',
  email: 'admin@example.com',
  role: {
    name: 'administrador',
  },
};

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      isInitialized: false,
      isLoading: false,
    });
  });

  describe('initial state', () => {
    it('starts without an authenticated user', () => {
      const state = useAuthStore.getState();

      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isInitialized).toBe(false);
      expect(state.isLoading).toBe(false);
    });
  });

  describe('initialize', () => {
    it('sets the authenticated user when a valid session exists', async () => {
      await useAuthStore.getState().initialize();

      const state = useAuthStore.getState();

      expect(state.user).toEqual(authenticatedUser);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isInitialized).toBe(true);
      expect(state.isLoading).toBe(false);
    });

    it('clears the authentication state when the session is not valid', async () => {
      const { server } = await import('@/test/mocks/server');
      const { http, HttpResponse } = await import('msw');
      const { env } = await import('@/config/env');

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

      await useAuthStore.getState().initialize();

      const state = useAuthStore.getState();

      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isInitialized).toBe(true);
      expect(state.isLoading).toBe(false);
    });
  });

  describe('login', () => {
    it('authenticates the user successfully', async () => {
      await useAuthStore.getState().login({
        email: 'admin@example.com',
        password: 'password',
      });

      const state = useAuthStore.getState();

      expect(state.user).toEqual(authenticatedUser);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isInitialized).toBe(false);
      expect(state.isLoading).toBe(false);
    });

    it('keeps the user unauthenticated when login fails', async () => {
      const { server } = await import('@/test/mocks/server');
      const { http, HttpResponse } = await import('msw');
      const { env } = await import('@/config/env');

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
        useAuthStore.getState().login({
          email: 'admin@example.com',
          password: 'pasrd',
        }),
      ).rejects.toMatchObject({
        response: {
          status: 401,
        },
      });

      const state = useAuthStore.getState();

      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isInitialized).toBe(false);
      expect(state.isLoading).toBe(false);
    });
  });

  describe('logout', () => {
    it('clears the authentication state', async () => {
      useAuthStore.setState({
        user: authenticatedUser,
        isAuthenticated: true,
        isInitialized: true,
        isLoading: false,
      });

      await useAuthStore.getState().logout();

      const state = useAuthStore.getState();

      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isInitialized).toBe(true);
      expect(state.isLoading).toBe(false);
    });
  });

  describe('handleUnauthorized', () => {
    it('clears the authentication state', () => {
      useAuthStore.setState({
        user: authenticatedUser,
        isAuthenticated: true,
        isInitialized: true,
        isLoading: false,
      });

      useAuthStore.getState().handleUnauthorized();

      const state = useAuthStore.getState();

      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isInitialized).toBe(true);
      expect(state.isLoading).toBe(false);
    });
  });
});
