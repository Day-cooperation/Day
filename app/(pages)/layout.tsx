import '@/styles/globals.css';
import SideMenu from '@/components/SideMenu/SideMenu';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`bg-slate-100 min-h-screen h-full flex flex-col md:flex-row `}>
      <SideMenu />
      {children}
    </div>
  );
}
