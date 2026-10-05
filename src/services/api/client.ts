import axios from 'axios';

import { env } from '@/config/env';

export const apiClient = axios.create({
  baseURL: `${env.apiUrl}/api/v1`,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
});
