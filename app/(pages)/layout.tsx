import '@/styles/globals.css';
import SideMenu from '@/components/SideMenu/SideMenu';
import Providers from '@/utils/Providers';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className={`bg-slate-100 min-h-screen h-full flex flex-col md:flex-row `}>
        <SideMenu />
        <div className='lg:ml-[331px] w-full'>{children}</div>
      </div>
    </Providers>
  );
}
