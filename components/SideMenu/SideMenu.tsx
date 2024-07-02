'use client';
import { Listbox, ListboxItem, RadioGroup, Radio } from '@nextui-org/react';
import Image from 'next/image';
import logo from '@/assets/svgs/logo.svg';
import sideFoldButton from '@/assets/svgs/sideFoldButton.svg';
import profile from '@/assets/svgs/profile.svg';
import plus from '@/assets/svgs/plus.svg';
import plusBlue from '@/assets/svgs/plus-blue.svg';
import home from '@/assets/svgs/home.svg';
import flag from '@/assets/svgs/flag.svg';
import logoIcon from '@/assets/svgs/logo-icon.svg';
import Button from '../Buttons/Button';
import { useState } from 'react';

const mock = {
  user: { profileUrl: '', name: '코딩잇', email: 'coding@coding.com' },
  goal: ['자바스크립트로 리액트 만들기', 'UI/UX 강의 듣기'],
};
export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(true);

  return isOpen ? (
    <div className={`w-[280px] bg-white transition-all duration-300 ${isOpen ? '' : '-translate-x-[220px]'}`}>
      <div className='p-6 border-b'>
        <div className='flex justify-between flex-shrink-0 mb-[13px]'>
          <Image src={logo} alt='logo' />
          <button type='button' onClick={() => setIsOpen(!isOpen)}>
            <Image src={sideFoldButton} alt='side-fold-button' />
          </button>
        </div>
        <div className='flex gap-3 pb-6'>
          <div className='h-16 w-16 bg-blue-50 flex justify-center items-center rounded-xl'>
            <Image src={mock.user.profileUrl || profile} alt='logo' />
          </div>
          <div className='flex flex-col gap-2'>
            <div>
              <p className='text-slate-800 text-sm font-semibold'>{mock.user.name}</p>
              <p className='text-slate-600 text-sm font-medium'>{mock.user.email}</p>
            </div>
            <p className='text-slate-400 text-xs font-normal'>로그아웃</p>
          </div>
        </div>
        <Button variant='solid' size='lg'>
          <div className='flex items-center font-semibold'>
            <Image src={plus} alt='plus' />
            <span className='text-base'>새 할 일</span>
          </div>
        </Button>
      </div>
      <div className='px-6 py-[18px] border-b flex gap-2'>
        <div className='h-6 w-6 flex items-center justify-center'>
          <Image src={home} alt='home-icon' />
        </div>
        <button>대시보드</button>
      </div>
      <div className='px-6 py-[18px] flex flex-col gap-4'>
        <div className='flex gap-2'>
          <Image src={flag} alt='home-icon' />
          <h2>목표</h2>
        </div>
        <Listbox>
          {mock.goal.map((item) => (
            <ListboxItem key={item}>{item}</ListboxItem>
          ))}
        </Listbox>
        <Button size='lg'>
          <div className='flex items-center font-semibold'>
            <Image src={plusBlue} alt='plus' />
            <span className='text-base'>새 목표</span>
          </div>
        </Button>
      </div>
    </div>
  ) : (
    <div className='w-[60px] duration-300 bg-white p-[15px]'>
      <div className='flex flex-col justify-between items-center gap-4'>
        <Image src={logoIcon} alt='logo' />
        <button type='button' onClick={() => setIsOpen(!isOpen)}>
          <Image src={sideFoldButton} alt='side-fold-button' className='rotate-180' />
        </button>
      </div>
    </div>
  );
}
