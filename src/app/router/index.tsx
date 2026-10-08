import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';

import { PlaygroundPage } from '@/dev/playground/playground-page';
import { GuestRoute } from '@/features/auth/components/guest-route';
import { ProtectedRoute } from '@/features/auth/components/protected-route';
import { DashboardPage } from '@/features/auth/pages/dashboard-page';
import { LoginPage } from '@/features/auth/pages/login-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/login',
    element: (
      <GuestRoute>
        <LoginPage />
      </GuestRoute>
    ),
  },
  {
    path: '/playground',
    element: <PlaygroundPage />,
  },
  {
    element: (
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
    ],
  },
]);
