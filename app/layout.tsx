import Providers from '@/utils/Providers';
import localFont from 'next/font/local';
import '@/styles/globals.css';

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
