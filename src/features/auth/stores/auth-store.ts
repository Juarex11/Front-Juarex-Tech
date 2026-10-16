import { create } from 'zustand';

import { clearToken, getToken, setToken } from '../lib/token';
import {
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
    if (!getToken()) {
      set({ user: null, isAuthenticated: false, isInitialized: true, isLoading: false });

      return;
    }

    set({ isLoading: true });

    try {
      const user = await getCurrentUser();

      set({ user, isAuthenticated: true });
    } catch {
      clearToken();
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isInitialized: true, isLoading: false });
    }
  },

  login: async (credentials) => {
    set({ isLoading: true });

    try {
      const { token, user } = await loginService(credentials);

      setToken(token);

      const currentUser = user ?? (await getCurrentUser());

      set({ user: currentUser, isAuthenticated: true });
    } catch (error) {
      clearToken();
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });

    try {
      await logoutService();
    } catch {
      // Aunque el servidor falle, la sesión local se cierra igualmente.
    } finally {
      clearToken();
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  handleUnauthorized: () => {
    clearToken();
    set({ user: null, isAuthenticated: false });
  },
}));