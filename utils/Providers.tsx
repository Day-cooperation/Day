'use client';

import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const queryClient = new QueryClient();

export default function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <ProgressBar
        height='4px'
        color='#3b82f6'
        startPosition={0.3}
        options={{ showSpinner: false }}
        shallowRouting={true}
      />
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>{children}</NextUIProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
