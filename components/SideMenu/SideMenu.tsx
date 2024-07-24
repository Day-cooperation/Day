'use client';
import { Home, LogoIcon, Hamburger, Profile, SideFoldButton, Logo, Plus, Flag } from '@/assets/svgs/index';

import { BaseSyntheticEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import TabSideMenu from './TabSideMenu';
import Button from '../Buttons/Button';
import { postRequest } from '@/api/api';
import Modal from '../Modal/Modal';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import MixedInput from '../Input/MixedInput';
import { queryKey, useGetQuery } from '@/queries/query';
import { useSideMenuOpen } from '@/stores/useSideMenuOpen';
import { useDisclosure } from '@nextui-org/react';
import { signOut } from 'next-auth/react';

export default function SideMenu() {
  const queryClient = useQueryClient();
  const { data: userData } = useGetQuery.user();
  const { data } = useGetQuery.goal();
  const { mutate: createGoalMutation } = useMutation({
    mutationFn: (input: string) => postRequest({ url: 'goals', data: { title: input } }),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey.goal());
      queryClient.invalidateQueries(queryKey.todo());
    },
  });
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(true);
  const [isNewGoalInputActive, setIsNewGoalInputActive] = useState(false);
  const [goalInput, setGoalInput] = useState('');
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [currentTab, setCurrentTab] = useState('DashBoard');
  const router = useRouter();
  const sideRef = useRef<HTMLDivElement>(null);
  const pathName = usePathname();

  const { setIsOpen: setSideMenuOpen } = useSideMenuOpen();

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const handleMenuClick = (id?: number) => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 1024) {
        toggleSideMenu();
      }
    }
    if (id) router.push(`/goals/${id}`);
  };

  const handleAddNewGoalClick = () => {
    setIsNewGoalInputActive(!isNewGoalInputActive);
  };

  const handleInputChange = (e: BaseSyntheticEvent) => {
    setGoalInput(e.target.value);
  };

  const handleKeydownInput = (e: KeyboardEvent<HTMLInputElement> | KeyboardEvent) => {
    if (e.key === 'Escape') {
      setGoalInput('');
      setIsNewGoalInputActive(!isNewGoalInputActive);
    }
    if (e.key === 'Enter') {
      createGoalMutation(goalInput);
      setGoalInput('');
      setIsNewGoalInputActive(!isNewGoalInputActive);
    }
  };

  useEffect(() => {
    if (pathName) {
      const newHeader = pathName.split('/')[1];
      const headerUpper = newHeader.charAt(0).toUpperCase() + newHeader.slice(1);
      setCurrentTab(headerUpper);
    }
  }, [pathName]);

  useEffect(() => {
    setSideMenuOpen(isSideMenuOpen);
    const outsideClick = (e: MouseEvent) => {
      if (typeof window !== 'undefined') {
        if (isSideMenuOpen && !sideRef.current?.contains(e.target as Node) && window.innerWidth < 1024) {
          toggleSideMenu();
        }
      }
    };
    document.addEventListener('mousedown', outsideClick);

    return () => document.removeEventListener('mousedown', outsideClick);
  }, [isSideMenuOpen]);
  return (
    <div>
      <Modal modalType='create' isOpen={isOpen} onClose={onClose} />
      {isSideMenuOpen ? (
        <>
          <div className='hidden z-[11] md:block lg:hidden fixed w-screen h-screen opacity-50 duration-150 bg-black '></div>
          <div
            ref={sideRef}
            className={`fixed z-[11] w-screen h-screen md:w-[280px] transition-all bg-white duration-150 ${isSideMenuOpen ? '' : 'hidden'} border-r`}
          >
            <div className='p-6 border-b'>
              <div className='flex justify-between mb-4 md:mb-[13px]'>
                <Logo />
                <button type='button' onClick={toggleSideMenu} className='hover:scale-105 duration-150'>
                  <SideFoldButton className='hidden md:block' />
                  <Hamburger className='md:hidden' />
                </button>
              </div>

              <div className='flex gap-3 md:pb-6'>
                <Profile className='h-8 w-8 md:h-16 md:w-16 shrink-0' />
                <div className='flex md:flex-col md:gap-2 w-full justify-between items-end md:items-start'>
                  <div className='flex flex-col'>
                    <span className='text-slate-800 text-xs md:text-sm font-semibold'>{userData?.name}</span>
                    <span className='text-slate-600 text-xs md:text-sm font-medium'>{userData?.email}</span>
                  </div>
                  <button
                    type='button'
                    className='text-slate-400 text-xs font-normal md:text-left'
                    onClick={() => signOut()}
                  >
                    로그아웃
                  </button>
                </div>
              </div>

              {/* 테블릿 ~ : 새 할 일 버튼 */}
              <div className='hidden md:block'>
                <Button variant='solid' size='xl' className='h-[48px]' onClick={onOpen}>
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
                <Link href='/dashboard' onClick={() => handleMenuClick()}>
                  대시보드
                </Link>
              </div>

              {/* 모바일 : 새 할 일 버튼 */}
              <div className='md:hidden'>
                <Button variant='solid' size='sm' onClick={onOpen}>
                  <div className='flex items-center justify-center'>
                    <Plus width={16} height={16} />
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
                  {isNewGoalInputActive ? (
                    <MixedInput
                      size='full'
                      name='goal'
                      type='text'
                      value={goalInput}
                      handleChange={handleInputChange}
                      handleKeyDown={handleKeydownInput}
                      props={{ placeholder: '목표를 적고 엔터를 눌러주세요.' }}
                    ></MixedInput>
                  ) : (
                    <Button size='sm' onClick={handleAddNewGoalClick}>
                      <div className='flex items-center justify-center'>
                        <Plus strokeColor='blue' width={16} height={16} />
                        <span className='text-sm font-semibold'>새 목표</span>
                      </div>
                    </Button>
                  )}
                </div>
              </div>
              <div className='relative max-h-[calc(100vh-283px)] md:max-h-[calc(100vh-430px)] overflow-y-auto'>
                <TabSideMenu goalList={data?.goals} handleGoalClick={handleMenuClick} />
                <div className='sticky bottom-0 w-full h-12 bg-gradient-to-b from-white/50 to-white/100 pointer-events-none' />
              </div>
              {/* 테블릿 ~ : 목표 버튼  */}
              <div className='hidden md:block'>
                {isNewGoalInputActive ? (
                  <MixedInput
                    size='full'
                    name='goal'
                    type='text'
                    value={goalInput}
                    handleChange={handleInputChange}
                    handleKeyDown={handleKeydownInput}
                    props={{ placeholder: '목표를 적고 엔터를 눌러주세요.' }}
                  ></MixedInput>
                ) : (
                  <Button size='xl' className='h-[48px]' onClick={handleAddNewGoalClick}>
                    <div className='flex items-center font-semibold'>
                      <Plus strokeColor='blue' />
                      <span className='text-base'>새 목표</span>
                    </div>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        // 사이드 메뉴 접혔을 때
        <>
          {/* 모바일 */}
          <div className='h-12 bg-white md:hidden flex items-center gap-4 px-4 border-b'>
            <button type='button' onClick={toggleSideMenu}>
              <Hamburger />
            </button>
            <h2 className='text-slate-900 font-semibold'>{currentTab}</h2>
          </div>
          {/* 테블릿 이상 */}
          <div className='z-10 fixed hidden md:block w-[60px] duration-150 bg-white p-[15px] h-screen border-r'>
            <div className='flex flex-col justify-between items-center gap-4'>
              <LogoIcon />
              <button type='button' onClick={toggleSideMenu}>
                <SideFoldButton className='rotate-180' />
              </button>
            </div>
          </div>
        </>
      )}
      <div className='w-[60px] h-full lg:hidden' />
    </div>
  );
}
