import { describe, expect, it, vi } from 'vitest';
import { http, HttpResponse } from 'msw';

import { env } from '@/config/env';
import { server } from '@/test/mocks/server';

import { apiClient } from './client';
import { subscribeToUnauthorized } from './unauthorized-handler';

describe('apiClient', () => {
  it('notifies unauthorized subscribers when the API returns 401', async () => {
    server.use(
      http.get(`${env.apiUrl}/api/v1/test`, () => {
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

    const unauthorizedHandler = vi.fn();
    const unsubscribe = subscribeToUnauthorized(unauthorizedHandler);

    await expect(apiClient.get('/test')).rejects.toMatchObject({
      response: {
        status: 401,
      },
    });

    expect(unauthorizedHandler).toHaveBeenCalledTimes(1);

    unsubscribe();
  });

  it('does not notify unauthorized subscribers for successful responses', async () => {
    server.use(
      http.get(`${env.apiUrl}/api/v1/test`, () => {
        return HttpResponse.json({
          success: true,
          message: 'Request successful.',
          data: null,
          errors: [],
        });
      }),
    );

    const unauthorizedHandler = vi.fn();
    const unsubscribe = subscribeToUnauthorized(unauthorizedHandler);

    await expect(apiClient.get('/test')).resolves.toMatchObject({
      status: 200,
    });

    expect(unauthorizedHandler).not.toHaveBeenCalled();

    unsubscribe();
  });
});
