import { NextUIProvider } from '@nextui-org/react';
import localFont from 'next/font/local';
import '@/styles/globals.css';
import SideMenu from '@/components/SideMenu/SideMenu';

const pretendard = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={`${pretendard.variable} font-pretendard bg-slate-100`}>
        <NextUIProvider>
          {/* <SideMenu /> */}
          {children}
        </NextUIProvider>
      </body>
    </html>
  );
}
