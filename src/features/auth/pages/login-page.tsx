import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '../stores/auth-store';
import { loginSchema, type LoginFormData } from '../schemas/login-schema';

export function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);

  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);

    try {
      await login(data);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        setServerError(
          typeof message === 'string'
            ? message
            : 'No fue posible iniciar sesión. Inténtalo nuevamente.',
        );

        return;
      }

      setServerError('No fue posible iniciar sesión. Inténtalo nuevamente.');
    }
  };

  return (
    <main>
      <h1>Iniciar sesión</h1>
      <p>Ingresa tus credenciales para continuar.</p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label htmlFor="email">Correo electrónico</label>

          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register('email')}
          />

          {errors.email && <p role="alert">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password">Contraseña</label>

          <input
            id="password"
            type="password"
            autoComplete="current-password"
            {...register('password')}
          />

          {errors.password && <p role="alert">{errors.password.message}</p>}
        </div>

        {serverError && <p role="alert">{serverError}</p>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>
      </form>
    </main>
  );
}
