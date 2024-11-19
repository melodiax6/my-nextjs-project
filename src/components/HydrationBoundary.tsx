'use client';

import React, { ReactNode, useState } from 'react';

interface HydrationBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

export const HydrationBoundary: React.FC<HydrationBoundaryProps> = ({ children, fallback }) => {
  const [hydrationError, setHydrationError] = useState<boolean>(false);

  React.useEffect(() => {
    try {
      // Example: Attempt to hydrate
    } catch (error) {
      setHydrationError(true);
      console.error('Hydration error:', error);
    }
  }, []);

  if (hydrationError) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};