import { apiClient } from '@/services/api/client';
import type { ApiSuccessResponse } from '@/services/api/types';

import type { AuthenticatedUser } from '../types/auth';

export interface LoginCredentials {
  email: string;
  password: string;
}

// Backend aún está ajustando la forma exacta de data; se aceptan las variantes habituales.
interface LoginResponseData {
  token?: string;
  access_token?: string;
  user?: AuthenticatedUser;
}

export interface LoginResult {
  token: string;
  user: AuthenticatedUser | null;
}

export async function login(credentials: LoginCredentials): Promise<LoginResult> {
  const response = await apiClient.post<ApiSuccessResponse<LoginResponseData>>(
    '/auth/login',
    credentials,
  );

  const data = response.data.data;
  const token = data.token ?? data.access_token;

  if (!token) {
    throw new Error('La API no devolvió un token.');
  }

  return { token, user: data.user ?? null };
}

export async function getCurrentUser(): Promise<AuthenticatedUser> {
  const response = await apiClient.get<ApiSuccessResponse<AuthenticatedUser>>('/auth/me');

  return response.data.data;
}

export async function logout(): Promise<void> {
  await apiClient.post('/auth/logout');
}