import { create } from 'zustand';

import {
  getCsrfCookie,
  getCurrentUser,
  login as loginService,
  logout as logoutService,
} from '../services/auth-service';
import type { LoginCredentials } from '../services/auth-service';
import type { AuthenticatedUser } from '../types/auth';

interface AuthState {
  user: AuthenticatedUser | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  isLoading: boolean;
  initialize: () => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  handleUnauthorized: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isInitialized: false,
  isLoading: false,

  initialize: async () => {
    set({ isLoading: true });

    try {
      const user = await getCurrentUser();

      set({
        user,
        isAuthenticated: true,
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
      });
    } finally {
      set({
        isInitialized: true,
        isLoading: false,
      });
    }
  },

  login: async (credentials) => {
    set({ isLoading: true });

    try {
      await getCsrfCookie();

      const user = await loginService(credentials);

      set({
        user,
        isAuthenticated: true,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });

    try {
      await logoutService();

      set({
        user: null,
        isAuthenticated: false,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  handleUnauthorized: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
  },
}));
