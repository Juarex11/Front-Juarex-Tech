import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { loginSchema, type LoginFormData } from '../schemas/login-schema';
import { useAuthStore } from '../stores/auth-store';

export function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);

  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

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
    <main className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-[#0284c7] via-[#0284c7] to-[#0369a1] p-4 sm:p-6 lg:p-8">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        
        {/* Panel Izquierdo: Réplica exacta del efecto neón con resplandor cyan y estrellas */}
        <div className="relative hidden w-1/2 flex-col items-center justify-center bg-gradient-to-b from-[#0284c7] via-[#0369a1] to-[#075985] p-10 text-white lg:flex overflow-hidden">
          
          {/* Luz de fondo intensa de resplandor neón */}
          <div className="absolute h-80 w-80 rounded-full bg-cyan-300/40 blur-[80px]" />

          {/* Anillos concéntricos neón cyan con resplandor exterior */}
          <div className="absolute h-[22rem] w-[22rem] rounded-full border-2 border-cyan-300/60 shadow-[0_0_35px_#22d3ee]" />
          <div className="absolute h-[17rem] w-[17rem] rounded-full border-2 border-cyan-300/80 shadow-[0_0_25px_#22d3ee]" />
          <div className="absolute h-[12rem] w-[12rem] rounded-full border-2 border-cyan-200 shadow-[0_0_20px_#22d3ee]" />

          {/* Destellos de estrellas brillantes alrededor */}
          <div className="absolute top-10 left-10 h-2 w-2 rounded-full bg-white shadow-[0_0_12px_#ffffff]" />
          <div className="absolute top-16 right-12 h-1.5 w-1.5 rounded-full bg-cyan-100 shadow-[0_0_10px_#22d3ee]" />
          <div className="absolute top-28 left-20 h-1 w-1 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
          <div className="absolute bottom-12 right-16 h-2 w-2 rounded-full bg-white shadow-[0_0_12px_#ffffff]" />
          <div className="absolute bottom-20 left-14 h-1.5 w-1.5 rounded-full bg-cyan-100 shadow-[0_0_10px_#22d3ee]" />

          {/* Logo Neón Central */}
          <div className="z-10 mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-cyan-400/20 backdrop-blur-sm border-2 border-cyan-200/80 shadow-[0_0_50px_rgba(34,211,238,0.8)]">
            <svg className="w-16 h-16 text-cyan-200 drop-shadow-[0_0_12px_#22d3ee]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="4" />
              <path strokeLinecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
          </div>

          {/* Texto Get Started neón */}
          <h2 className="z-10 text-3xl font-bold tracking-wider text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]">
            Get Started
          </h2>
        </div>

        {/* Panel Derecho: Formulario */}
        <div className="flex w-full flex-col justify-between p-8 sm:p-12 lg:w-1/2 bg-white">
          
          {/* Pestañas de navegación superiores */}
          <div className="flex justify-end space-x-1 text-xs">
            <span className="rounded-sm border border-gray-300 px-3 py-1 font-medium text-gray-700 bg-white shadow-xs">
              Iniciar sesión
            </span>
            <a href="#register" className="rounded-sm bg-[#0284c7] px-3 py-1 font-medium text-white hover:bg-[#0369a1] transition-colors">
              Registro
            </a>
          </div>

          {/* Formulario */}
          <div className="mx-auto w-full max-w-sm space-y-8 my-auto py-4">
            
            <div className="space-y-1">
              <CardTitle asChild className="text-2xl font-bold tracking-tight text-gray-800">
                <h1>Iniciar sesión</h1>
              </CardTitle>
              <CardDescription className="text-xs text-gray-400">
                Ingresa tus credenciales para continuar.
              </CardDescription>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
              
              {/* Campo Correo */}
              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="email" className="text-gray-600 text-[11px] font-semibold uppercase tracking-wider">
                  Correo electrónico
                </FieldLabel>

                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="nombre@ejemplo.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  {...register('email')}
                  className="mt-1 border-0 border-b border-gray-300 rounded-none px-0 py-2 focus-visible:ring-0 focus-visible:border-[#0284c7] text-sm text-gray-800 placeholder:text-gray-300 shadow-none"
                />

                <FieldError id="email-error">{errors.email?.message}</FieldError>
              </Field>

              {/* Campo Contraseña */}
              <Field data-invalid={!!errors.password}>
                <FieldLabel htmlFor="password" className="text-gray-600 text-[11px] font-semibold uppercase tracking-wider">
                  Contraseña
                </FieldLabel>

                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? 'password-error' : undefined}
                    {...register('password')}
                    className="mt-1 border-0 border-b border-gray-300 rounded-none px-0 py-2 pr-8 focus-visible:ring-0 focus-visible:border-[#0284c7] text-sm text-gray-800 placeholder:text-gray-300 shadow-none"
                  />
                  
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors focus:outline-none"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12c1.274-4.057 5.065-7 9.544-7 4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.479 0-8.268-2.943-9.542-7z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>

                <FieldError id="password-error">{errors.password?.message}</FieldError>
              </Field>

              {/* Mensaje de Error del Servidor */}
              {serverError && (
                <p
                  role="alert"
                  className="rounded-md bg-red-50 p-2.5 text-xs text-red-600 font-medium border border-red-100"
                >
                  {serverError}
                </p>
              )}

              {/* Botón de Enviar */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold py-2.5 rounded-sm transition-all shadow-md"
              >
                {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
              </Button>
            </form>

            {/* Enlaces de pie */}
            <div className="flex items-center justify-between text-[11px] text-gray-500 pt-2">
              <a href="#forgot" className="hover:text-[#0284c7] transition-colors">
                ¿Olvidaste tu contraseña?
              </a>
              <a href="#register" className="hover:text-[#0284c7] transition-colors">
                ¿Aún no eres <span className="underline font-semibold text-gray-700">Miembro</span>?
              </a>
            </div>

          </div>

          <div />
        </div>

      </div>
    </main>
  );
}