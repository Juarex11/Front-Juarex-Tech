import { useEffect, type ReactNode } from 'react';

import { subscribeToUnauthorized } from '@/services/api/unauthorized-handler';

import { useAuthStore } from '../stores/auth-store';

interface AuthInitializerProps {
  children: ReactNode;
}

export function AuthInitializer({ children }: AuthInitializerProps) {
  const initialize = useAuthStore((state) => state.initialize);
  const handleUnauthorized = useAuthStore((state) => state.handleUnauthorized);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  useEffect(() => {
    return subscribeToUnauthorized(handleUnauthorized);
  }, [handleUnauthorized]);

  useEffect(() => {
    if (!isInitialized) {
      void initialize();
    }
  }, [initialize, isInitialized]);

  if (!isInitialized) {
    return null;
  }

  return children;
}
