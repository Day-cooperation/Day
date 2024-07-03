'use client';
import { Listbox, ListboxItem, RadioGroup, Radio } from '@nextui-org/react';
import Image from 'next/image';
import logo from '@/assets/svgs/logo.svg';
import sideFoldButton from '@/assets/svgs/sideFoldButton.svg';
import { Profile } from '@/assets/svgs/Profile';
import plus from '@/assets/svgs/plus.svg';
import plusBlue from '@/assets/svgs/plus-blue.svg';
import home from '@/assets/svgs/home.svg';
import flag from '@/assets/svgs/flag.svg';
import logoIcon from '@/assets/svgs/logo-icon.svg';
import Button from '../Buttons/Button';
import { useState } from 'react';

const mock = {
  user: { profileUrl: '', name: '코딩잇', email: 'coding@coding.com' },
  goal: [
    '자바스크립트로 리액트 만들기',
    'UI/UX 강의 듣기',
    '자바스크립트로 리액트 만들기',
    '자바스크립트로 리액트 만들기',
    '자바스크립트로 리액트 만들기',
    '자바스크립트로 리액트 만들기',
    '자바스크립트로 리액트 만들기',
    '자바스크립트로 리액트 만들기',
    '자바스크립트로 리액트 만들기',
    '자바스크립트로 리액트 만들기',
    '자바스크립트로 리액트 만들기',
    '자바스크립트로 리액트 만들기',
    '자바스크립트로 리액트 만들기',
    '자바스크립트로 리액트 만들기',
    '자바스크립트로 리액트 만들기',
    '자바스크립트로 리액트 만들기',
    '자바스크립트로 리액트 만들기',
    '자바스크립트로 리액트 만들기',
    '자바스크립트로 리액트 만들기',
    '자바스크립트로 리액트 만들기',
    '자바스크립트로 리액트 만들기',
    '자바스크립트로 리액트 만들기',
  ],
};
export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(true);

  return isOpen ? (
    <div className={`fixed w-screen h-screen md:w-[280px] bg-white duration-150 ${isOpen ? '' : 'hidden'}`}>
      <div className='p-6 border-b'>
        <div className='flex justify-between mb-4 md:mb-[13px]'>
          <Image src={logo} alt='logo' />
          <button
            type='button'
            onClick={() => setIsOpen(!isOpen)}
            className='hidden md:block hover:scale-105 duration-150'
          >
            <Image src={sideFoldButton} alt='side-fold-button' />
          </button>
        </div>

        <div className='flex gap-3 md:pb-6'>
          <Profile className='h-8 w-8 md:h-16 md:w-16 shrink-0' />
          <div className='flex md:flex-col md:gap-2 w-full justify-between mobile:items-end'>
            <div className='flex flex-col'>
              <span className='text-slate-800 text-xs md:text-sm font-semibold'>{mock.user.name}</span>
              <span className='text-slate-600 text-xs md:text-sm font-medium'>{mock.user.email}</span>
            </div>
            <button type='button' className='text-slate-400 text-xs font-normal md:text-left'>
              로그아웃
            </button>
          </div>
        </div>

        <div className='hidden md:block'>
          <Button variant='solid' size='lg'>
            <div className='flex items-center'>
              <Image src={plus} alt='plus' />
              <span className='text-base font-semibold'>새 할 일</span>
            </div>
          </Button>
        </div>
      </div>
      <div className='px-6 border-b flex items-center justify-between'>
        <div className='py-[18px] flex gap-2'>
          <div className='h-6 w-6 flex items-center justify-center'>
            <Image src={home} alt='home-icon' />
          </div>
          <button>대시보드</button>
        </div>
        <div className='md:hidden'>
          <Button variant='solid' sizes='sm'>
            <div className='flex items-center justify-center'>
              <Image src={plus} alt='plus' width={16} height={16} />
              <span className='text-sm font-semibold'>새 할 일</span>
            </div>
          </Button>
        </div>
      </div>

      <div className='px-6 flex flex-col'>
        <div className='flex justify-between items-center py-3 md:py-[18px]'>
          <div className='flex gap-2 '>
            <Image src={flag} alt='home-icon' />
            <h2>목표</h2>
          </div>
          <div className='md:hidden'>
            <Button sizes='sm'>
              <div className='flex items-center justify-center'>
                <Image src={plusBlue} alt='plus' width={16} height={16} />
                <span className='text-sm font-semibold'>새 목표</span>
              </div>
            </Button>
          </div>
        </div>
        <div className='relative h-[calc(100vh-283px)] md:h-[calc(100vh-440px)] overflow-y-auto md:mb-6 mb-[-48px]'>
          <Listbox>
            {mock.goal.map((item) => (
              <ListboxItem key={item} startContent='·'>
                {item}
              </ListboxItem>
            ))}
          </Listbox>
          <div className='sticky bottom-0 w-full h-12 bg-gradient-to-b from-white/0 to-white/100' />
        </div>
        <div className='hidden md:block'>
          <Button size='lg'>
            <div className='flex items-center font-semibold'>
              <Image src={plusBlue} alt='plus' />
              <span className='text-base'>새 목표</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <div className='w-[60px] duration-150 bg-white p-[15px]'>
      <div className='flex flex-col justify-between items-center gap-4'>
        <Image src={logoIcon} alt='logo' />
        <button type='button' onClick={() => setIsOpen(!isOpen)}>
          <Image src={sideFoldButton} alt='side-fold-button' className='rotate-180 hover:scale-105 duration-150' />
        </button>
      </div>
    </div>
  );
}
