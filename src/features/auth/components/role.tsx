import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthStore } from '../stores/auth-store';

interface RoleRouteProps {
  allowedRoles: string[];
  children: ReactNode;
}

// Úsalo dentro de ProtectedRoute: <RoleRoute allowedRoles={['administrador']}>...</RoleRoute>
export function RoleRoute({ allowedRoles, children }: RoleRouteProps) {
  const role = useAuthStore((state) => state.user?.role.name);

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}