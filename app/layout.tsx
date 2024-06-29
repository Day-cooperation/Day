'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import localFont from 'next/font/local';
import '@/styles/globals.css';

const pretendard = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="ko">
        <body className={`${pretendard.variable} font-pretendard`}>{children}</body>
      </html>
    </QueryClientProvider>
  );
}
