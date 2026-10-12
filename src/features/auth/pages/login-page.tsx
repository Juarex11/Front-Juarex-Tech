import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { loginSchema, type LoginFormData } from '../schemas/login-schema';
import { useAuthStore } from '../stores/auth-store';

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
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle asChild className="text-3xl">
            <h1>Iniciar sesión 2027</h1>
          </CardTitle>

          <CardDescription>Ingresa tus credenciales para continuar.</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>

              <Input
                id="email"
                type="email"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                {...register('email')}
              />

              <FieldError id="email-error">{errors.email?.message}</FieldError>
            </Field>

            <Field data-invalid={!!errors.password}>
              <FieldLabel htmlFor="password">Contraseña</FieldLabel>

              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
                {...register('password')}
              />

              <FieldError id="password-error">{errors.password?.message}</FieldError>
            </Field>

            {serverError && (
              <p
                role="alert"
                className="rounded-md border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive"
              >
                {serverError}
              </p>
            )}

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
