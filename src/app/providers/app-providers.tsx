import type { ReactNode } from 'react';

import { AuthInitializer } from '@/features/auth/components/auth-initializer';

import { QueryProvider } from './query-provider';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryProvider>
      <AuthInitializer>{children}</AuthInitializer>
    </QueryProvider>
  );
}
