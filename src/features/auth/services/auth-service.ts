import axios from 'axios';

import { env } from '@/config/env';
import type { ApiSuccessResponse } from '@/services/api/types';

import type { AuthenticatedUser } from '../types/auth';

const sanctumClient = axios.create({
  baseURL: env.apiUrl,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
});

export interface LoginCredentials {
  email: string;
  password: string;
}

export async function getCsrfCookie(): Promise<void> {
  await sanctumClient.get('/sanctum/csrf-cookie');
}

export async function login(credentials: LoginCredentials): Promise<AuthenticatedUser> {
  const response = await sanctumClient.post<ApiSuccessResponse<AuthenticatedUser>>(
    '/api/v1/auth/login',
    credentials,
  );

  return response.data.data;
}

export async function getCurrentUser(): Promise<AuthenticatedUser> {
  const response =
    await sanctumClient.get<ApiSuccessResponse<AuthenticatedUser>>('/api/v1/auth/me');

  return response.data.data;
}

export async function logout(): Promise<void> {
  await sanctumClient.post('/api/v1/auth/logout');
}
