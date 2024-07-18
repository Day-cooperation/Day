'use client';
import '@/styles/globals.css';
import SideMenu from '@/components/SideMenu/SideMenu';
import { usePathname } from 'next/navigation';
export default function Layout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname().slice(-5);
  return (
    <div
      data-path={pathName === 'write'}
      className={`bg-slate-100 data-[path=true]:bg-white min-h-screen flex flex-col md:flex-row `}
    >
      <SideMenu />
      <div className='w-full'>{children}</div>
    </div>
  );
}
