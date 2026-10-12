import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

import { useAuthStore } from '../stores/auth-store';

import { GuestRoute } from './guest-route';

describe('GuestRoute', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      isInitialized: true,
      isLoading: false,
    });
  });

  it('renders the children when the user is not authenticated', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route
            path="/login"
            element={
              <GuestRoute>
                <h1>2</h1>
              </GuestRoute>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: 'Iniciar sesión' })).toBeInTheDocument();
  });

  it('redirects authenticated users to the dashboard', () => {
    useAuthStore.setState({
      user: {
        id: 1,
        name: 'Administrador',
        email: 'admin@example.com',
        role: {
          name: 'administrador',
        },
      },
      isAuthenticated: true,
      isInitialized: true,
      isLoading: false,
    });

    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route
            path="/login"
            element={
              <GuestRoute>
                <h1>Iniciar sesión</h1>
              </GuestRoute>
            }
          />
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument();

    expect(screen.queryByRole('heading', { name: 'Iniciar sesión' })).not.toBeInTheDocument();
  });

  it('renders nothing while authentication is not initialized', () => {
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      isInitialized: false,
      isLoading: true,
    });

    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route
            path="/login"
            element={
              <GuestRoute>
                <h1>Iniciar sesión</h1>
              </GuestRoute>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.queryByRole('heading', { name: 'Iniciar sesión' })).not.toBeInTheDocument();
  });
});
