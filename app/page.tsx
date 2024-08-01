'use client';
import { ArrowBounceDown } from '@/assets/svgs/ArrowBounceDown';
import { DayLogo } from '@/assets/svgs/DayLogo';
import MainMention from '@/components/Landing/MainMention';
import ServiceStart from '@/components/Landing/ServiceStart';
import WaveText from '@/components/Landing/WaveText';
import { useSignout } from '@/hooks/useSignout';
import { motion } from 'framer-motion';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const user = useSession();

  return (
    <main className='bg-[#111] flex flex-col'>
      <header className='fixed z-10 left-0 right-0 flex justify-around py-2'>
        <DayLogo />
        <div className='text-[#FFF] flex items-center gap-4'>
          <button onClick={() => signIn()} className='hover:opacity-50 p-2 duration-150'>
            {user.data ? '이용하기' : 'Sign in'}
          </button>
          <span>|</span>
          {user.data ? (
            <button onClick={() => useSignout()} className='hover:opacity-50 p-2 duration-150'>
              Logout
            </button>
          ) : (
            <button onClick={() => router.push('/signup')} className='hover:opacity-50 p-2 duration-150'>
              Sign up
            </button>
          )}
        </div>
      </header>

      <MainMention>
        <div>
          <span className='text-green-500'>목표</span>를 정해놓고
          <br />
          까먹으신다구요?
        </div>
      </MainMention>
      <MainMention>
        <div>
          <span className='text-green-500'>목표</span>를 만들고
          <br /> <span className='text-green-500'>할 일</span>을 채우세요
        </div>
      </MainMention>
      <MainMention>
        <div>
          <span className='text-green-500'>노트</span>를 활용해
          <br /> <span className='text-green-500'>내용</span>을 기록하세요
        </div>
      </MainMention>
      <MainMention>
        <div>
          계획의 모든것
          <br /> <span className='text-green-500'>Day</span>에서
          <br />
          쉽고 빠르게
        </div>
      </MainMention>
      <WaveText />
      <ServiceStart />
      <motion.div
        initial={{ opacity: 1 }}
        whileInView={{ opacity: 0 }}
        className='relative flex justify-center items-center '
      >
        <ArrowBounceDown className='fixed bottom-0 animate-bounce w-[70px] h-[70px] md:w-[106px] md:h-[106px]' />
      </motion.div>
    </main>
  );
}
