import axios from 'axios';

import { env } from '@/config/env';
import { getToken } from '@/features/auth/lib/token';

import { notifyUnauthorized } from './unauthorized-handler';

export const apiClient = axios.create({
  baseURL: `${env.apiUrl}/api/v1`,
  headers: {
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      notifyUnauthorized();
    }

    return Promise.reject(error);
  },
);