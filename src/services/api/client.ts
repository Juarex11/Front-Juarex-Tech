import axios from 'axios';

import { env } from '@/config/env';

import { notifyUnauthorized } from './unauthorized-handler';

export const apiClient = axios.create({
  baseURL: env.apiUrl,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
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
