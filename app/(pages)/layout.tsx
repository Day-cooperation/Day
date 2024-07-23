'use client';
import '@/styles/globals.css';
import SideMenu from '@/components/SideMenu/SideMenu';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import nProgress from 'nprogress';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    nProgress.done();
    return () => {
      nProgress.start();
    };
  }, [pathName, searchParams]);
  return (
    <>
      <div
        data-path={pathName.includes('note/write')}
        className={`bg-slate-100 data-[path=true]:bg-white min-h-screen flex flex-col md:flex-row `}
      >
        <SideMenu />
        <div className='lg:ml-[331px] w-full'>{children}</div>
      </div>
    </>
  );
}
