import Providers from '@/utils/Providers';
import localFont from 'next/font/local';
import '@/styles/globals.css';
import { Metadata } from 'next';
import Head from 'next/head';

const pretendard = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'Day',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <Head>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <body className={`${pretendard.variable} font-pretendard bg-slate-100`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
