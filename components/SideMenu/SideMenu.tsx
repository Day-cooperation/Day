'use client';
import { Home, LogoIcon, Hamburger, Profile, SideFoldButton, Logo, Plus, PlusBlue, Flag } from '@/assets/svgs/index';

import { useEffect, useRef, useState } from 'react';
import TabSideMenu from './TabSideMenu';
import type { Goal } from '@/types/Goal';
import type { User } from '@/types/User';
import Button from '../Buttons/Button';

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
  const opacityRef = useRef<HTMLDivElement>(null);
  const toggleSideMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleGoalClick = () => {
    toggleSideMenu();
    setCurrentTab('목표');
  };

  const handleOutSideClick = (event: Event) => {
    if (event.target === opacityRef.current) toggleSideMenu();
  };

  useEffect(() => {
    document.addEventListener('click', handleOutSideClick);
    return document.removeEventListener('click', handleGoalClick);
  });
  return isOpen ? (
    <>
      <div
        ref={opacityRef}
        className='hidden md:block lg:hidden fixed w-screen h-screen opacity-50 duration-150 bg-black'
      ></div>
      <div
        className={`fixed w-screen h-screen md:w-[280px] transition-all bg-white duration-150 ${isOpen ? '' : 'hidden'}`}
      >
        <div className='p-6 border-b'>
          <div className='flex justify-between mb-4 md:mb-[13px]'>
            <Logo />
            <button type='button' onClick={toggleSideMenu} className='hidden md:block hover:scale-105 duration-150'>
              <SideFoldButton />
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

          {/* 테블릿 ~ : 새 할 일 버튼 */}
          <div className='hidden md:block'>
            <Button variant='solid' size='xl' className='h-[48px]'>
              <div className='flex items-center'>
                <Plus />
                <span className='text-base font-semibold'>새 할 일</span>
              </div>
            </Button>
          </div>
        </div>
        <div className='px-6 border-b flex items-center justify-between'>
          <div className='py-[18px] flex gap-2'>
            <div className='h-6 w-6 flex items-center justify-center'>
              <Home />
            </div>
            <button
              onClick={() => {
                setCurrentTab('대시보드');
                toggleSideMenu();
              }}
            >
              대시보드
            </button>
          </div>

          {/* 모바일 : 새 할 일 버튼 */}
          <div className='md:hidden'>
            <Button variant='solid' size='sm'>
              <div className='flex items-center justify-center'>
                <Plus />
                <span className='text-sm font-semibold'>새 할 일</span>
              </div>
            </Button>
          </div>
        </div>
        <div className='px-6 flex flex-col'>
          <div className='flex justify-between items-center py-3 md:py-[18px]'>
            <div className='flex gap-2 '>
              <Flag />
              <h2>목표</h2>
            </div>
            {/* 모바일 : 목표 버튼  */}
            <div className='md:hidden'>
              <Button size='sm'>
                <div className='flex items-center justify-center'>
                  <PlusBlue />
                  <span className='text-sm font-semibold'>새 목표</span>
                </div>
              </Button>
            </div>
          </div>
          <TabSideMenu goalList={goalList} handleGoalClick={handleGoalClick} />

          {/* 테블릿 ~ : 목표 버튼  */}
          <div className='hidden md:block'>
            <Button size='xl' className='h-[48px]'>
              <div className='flex items-center font-semibold'>
                <PlusBlue />
                <span className='text-base'>새 목표</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </>
  ) : (
    // 사이드 메뉴 접혔을 때
    <>
      {/* 모바일 */}
      <div className='h-12 bg-white md:hidden flex items-center gap-4 px-4'>
        <button type='button' onClick={toggleSideMenu}>
          <Hamburger />
        </button>
        <h2 className='text-slate-900 font-semibold'>{currentTab}</h2>
      </div>
      {/* 테블릿 이상 */}
      <div className='fixed hidden md:block w-[60px] duration-150 bg-white p-[15px] h-screen'>
        <div className='flex flex-col justify-between items-center gap-4'>
          <LogoIcon />
          <button type='button' onClick={toggleSideMenu}>
            <SideFoldButton className='rotate-180' />
          </button>
        </div>
      </div>
    </>
  );
}
