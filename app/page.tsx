'use client';
import { ArrowBounceDown } from '@/assets/svgs/ArrowBounceDown';
import { DayLogo } from '@/assets/svgs/DayLogo';
import MainMention from '@/components/Landing/MainMention';
import ServiceStart from '@/components/Landing/ServiceStart';
import WaveText from '@/components/Landing/WaveText';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <main className='bg-[#111] flex flex-col'>
      <header className='fixed z-10 left-0 right-0 flex justify-around py-2'>
        <DayLogo />
        <div className='text-[#FFF] flex items-center gap-4'>
          <button onClick={() => signIn()}>signin</button>
          <span>|</span>
          <button onClick={() => router.push('/signup')}>signup</button>
        </div>
      </header>

      <MainMention>
        <div>
          <span className='text-[#3CB643]'>목표</span>를 정해놓고
          <br />
          까먹으신다구요?
        </div>
      </MainMention>
      <MainMention>
        <div>
          계획의 모든것
          <br /> <span className='text-[#3CB643]'>Day</span>에서
          <br />
          쉽고 빠르게
        </div>
      </MainMention>
      <MainMention>
        <div>
          하루를 <span className='text-[#3CB643]'>Day</span>와<br /> 함께 하세요.
        </div>
      </MainMention>
      <WaveText />
      <ServiceStart />
      <motion.div
        initial={{ opacity: 1 }}
        whileInView={{ opacity: 0 }}
        className='relative flex justify-center items-center '
      >
        <ArrowBounceDown className='fixed bottom-0 animate-bounce' />
      </motion.div>
    </main>
  );
}
