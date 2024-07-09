'use client';
import { Logo } from '@/assets/svgs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function QueryProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <main className='w-full h-screen bg-white'>
        <div className='mx-auto max-w-[640px] mt-[120px]'>
          <div className='flex justify-center py-[20.34px] px-[13.18px] mb-10'>
            <Logo className='w-[244.101px] h-[48.314px] shrink-0' />
          </div>
          {children}
        </div>
      </main>
    </QueryProvider>
  );
}
