'use client';

import { Logo } from '@/assets/svgs';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='-mt-24 fixed inset-0 h-screen p-4 bg-white flex flex-col justify-center items-center'>
      <div className='max-w-[640px] w-full'>
        <div className='flex justify-center py-[20.34px] px-[13.18px] mb-10'>
          <Logo className='w-[244.101px] h-[48.314px] shrink-0' />
        </div>
        {children}
      </div>
    </main>
  );
}
