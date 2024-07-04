'use client';

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
import Hamburger from '@/assets/svgs/Hamburger.svg';

import { useState } from 'react';
import TabSideMenu from './TabSideMenu';
import { Goal } from '@/types/Goal';
type User = {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

const user: User = {
  id: 1,
  email: 'coding@coding.com',
  name: '코딩잇',
  createdAt: 'date',
  updatedAt: 'date',
};

const goalList: Goal[] = [
  {
    updatedAt: '2024-07-04T05:06:21.673Z',
    createdAt: '2024-07-04T05:06:21.673Z',
    title: 'Learn TypeScript',
    id: 1,
    userId: 1,
    teamId: 'teamA',
  },
  {
    updatedAt: '2024-07-04T05:06:21.673Z',
    createdAt: '2024-07-04T05:06:21.673Z',
    title: 'Complete React Project',
    id: 2,
    userId: 1,
    teamId: 'teamA',
  },
  {
    updatedAt: '2024-07-04T05:06:21.673Z',
    createdAt: '2024-07-04T05:06:21.673Z',
    title: 'Read a book on UI/UX',
    id: 3,
    userId: 2,
    teamId: 'teamB',
  },
  {
    updatedAt: '2024-07-04T05:06:21.673Z',
    createdAt: '2024-07-04T05:06:21.673Z',
    title: 'Improve CSS skills',
    id: 4,
    userId: 3,
    teamId: 'teamC',
  },
  {
    updatedAt: '2024-07-04T05:06:21.673Z',
    createdAt: '2024-07-04T05:06:21.673Z',
    title: 'Build a portfolio',
    id: 5,
    userId: 4,
    teamId: 'teamD',
  },
  {
    updatedAt: '2024-07-04T05:06:21.673Z',
    createdAt: '2024-07-04T05:06:21.673Z',
    title: 'Learn Next.js',
    id: 6,
    userId: 1,
    teamId: 'teamA',
  },
  {
    updatedAt: '2024-07-04T05:06:21.673Z',
    createdAt: '2024-07-04T05:06:21.673Z',
    title: 'Write blog posts',
    id: 7,
    userId: 2,
    teamId: 'teamB',
  },
  {
    updatedAt: '2024-07-04T05:06:21.673Z',
    createdAt: '2024-07-04T05:06:21.673Z',
    title: 'Contribute to open source',
    id: 8,
    userId: 3,
    teamId: 'teamC',
  },
];

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(true);
  const [currentTab, setCurrentTab] = useState('DashBoard');

  const handleGoalClick = () => {
    setIsOpen(!isOpen);
    setCurrentTab('목표');
  };
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
          <div className='flex md:flex-col md:gap-2 w-full justify-between items-end md:items-start'>
            <div className='flex flex-col'>
              <span className='text-slate-800 text-xs md:text-sm font-semibold'>{user.name}</span>
              <span className='text-slate-600 text-xs md:text-sm font-medium'>{user.email}</span>
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
          <button
            onClick={() => {
              setCurrentTab('대시보드');
              setIsOpen(!isOpen);
            }}
          >
            대시보드
          </button>
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
        <TabSideMenu goalList={goalList} handleGoalClick={handleGoalClick} />
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
    <>
      <div className='hidden md:block w-[60px] duration-150 bg-white p-[15px]'>
        <div className='flex flex-col justify-between items-center gap-4'>
          <Image src={logoIcon} alt='logo' />
          <button type='button' onClick={() => setIsOpen(!isOpen)}>
            <Image src={sideFoldButton} alt='side-fold-button' className='rotate-180 hover:scale-105 duration-150' />
          </button>
        </div>
      </div>
      <div className='h-12 bg-white md:hidden flex items-center gap-4 px-4'>
        <button type='button' onClick={() => setIsOpen(!isOpen)}>
          <Image src={Hamburger} alt='hanburger-icon' width={12} height={8} className='mx-[6px] my-2' />
        </button>
        <h2 className='text-slate-900 font-semibold'>{currentTab}</h2>
      </div>
    </>
  );
}
