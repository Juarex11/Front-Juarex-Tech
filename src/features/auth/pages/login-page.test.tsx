import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';

import { env } from '@/config/env';
import { server } from '@/test/mocks/server';

import { LoginPage } from './login-page';

function renderLoginPage() {
  return render(
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<h1>Dashboard</h1>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('LoginPage', () => {
  it('renders the login form', () => {
    renderLoginPage();

    expect(screen.getByRole('heading', { name: 'Iniciar sesión' })).toBeInTheDocument();

    expect(screen.getByLabelText('Correo electrónico')).toBeInTheDocument();
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Iniciar sesión' })).toBeInTheDocument();
  });

  it('shows validation errors when the form is submitted empty', async () => {
    const user = userEvent.setup();

    renderLoginPage();

    await user.click(screen.getByRole('button', { name: 'Iniciar sesión' }));

    expect(screen.getByText('El correo electrónico es obligatorio.')).toBeInTheDocument();

    expect(screen.getByText('La contraseña es obligatoria.')).toBeInTheDocument();
  });

  it('shows an error when the email is invalid', async () => {
    const user = userEvent.setup();

    renderLoginPage();

    await user.type(screen.getByLabelText('Correo electrónico'), 'invalid-email');
    await user.type(screen.getByLabelText('Contraseña'), 'password');

    await user.click(screen.getByRole('button', { name: 'Iniciar sesión' }));

    expect(screen.getByText('Ingresa un correo electrónico válido.')).toBeInTheDocument();
  });

  it('redirects to the dashboard after successful login', async () => {
    const user = userEvent.setup();

    renderLoginPage();

    await user.type(screen.getByLabelText('Correo electrónico'), 'admin@example.com');
    await user.type(screen.getByLabelText('Contraseña'), 'password');

    await user.click(screen.getByRole('button', { name: 'Iniciar sesión' }));

    expect(await screen.findByRole('heading', { name: 'Dashboard' })).toBeInTheDocument();
  });

  it('shows the server error when login fails', async () => {
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

    const user = userEvent.setup();

    renderLoginPage();

    await user.type(screen.getByLabelText('Correo electrónico'), 'admin@example.com');
    await user.type(screen.getByLabelText('Contraseña'), 'pasrd');

    await user.click(screen.getByRole('button', { name: 'Iniciar sesión' }));

    expect(await screen.findByText('The provided credentials are incorrect.')).toBeInTheDocument();
  });
});
