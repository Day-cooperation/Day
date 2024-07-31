import { Logo } from '@/assets/svgs';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  if (session) redirect('/dashboard');

  return (
    <main className='fixed inset-0 h-screen p-4 bg-white flex flex-col justify-center items-center'>
      <div className='max-w-[640px] w-full  overflow-auto'>
        <div className='flex justify-center py-[20.34px] px-[13.18px] mb-10'>
          <Logo className='w-[280px] h-[35px] shrink-0' />
        </div>
        {children}
      </div>
    </main>
  );
}
