'use client';

import { ArrowRight, Rectangles } from '@/assets/svgs';
import ListTodo from '../ListTodo/ListTodo';
import NoteRead from '@/components/Note/NoteRead';

import Link from 'next/link';
import Modal from '../Modal/Modal';
import ConfirmPopup from '../Popup/ConfirmPopup';
import { useListTodo } from '@/hooks/useListTodo';
import { Spinner } from '@nextui-org/react';

export default function RecentlyTodo() {
  const {
    isLoading,
    confirmRef,
    confirm,
    handleDeleteConfirmClick,
    noteRef,
    noteData,
    onClose,
    isOpen,
    modalType,
    todo,
    todoResponse,
    handleListPopupClick,
  } = useListTodo();

  const todoList = todoResponse?.pages.flatMap((page) => page.todos);

  return (
    <>
      <ConfirmPopup
        type={confirm.type}
        dialogRef={confirmRef}
        confirmText={confirm.message}
        onConfirmClick={handleDeleteConfirmClick}
        confirm
      />
      <NoteRead dialogRef={noteRef} data={noteData} />
      <Modal onClose={onClose} isOpen={isOpen} modalType={modalType} items={todo} />
      <div className='relative w-full h-[250px] bg-white rounded-xl border-1 border-slate-100 px-6 py-4 flex flex-col gap-4 max-w-[1200px]'>
        {isLoading ? (
          <Spinner className='absolute top-[calc(50%-16px)] left-[calc(50%-16px)]' />
        ) : (
          <>
            <div className='flex justify-between'>
              <div className='flex items-center justify-center gap-2'>
                <div className='h-10 w-10 bg-green-500 rounded-[15px] flex items-center justify-center'>
                  <Rectangles />
                </div>
                <h2 className='text-slate-800 text-lg font-semibold'>최근 등록한 할 일</h2>
              </div>
              <Link href='/todolist' className='flex justify-center items-center'>
                <span className='text-sm outline-none'>모두 보기</span>
                <ArrowRight />
              </Link>
            </div>
            {todoList?.length ? (
              <div className='h-[154px] overflow-y-auto pt-1'>
                <ListTodo showGoal todos={todoList} onButtonClick={handleListPopupClick}></ListTodo>
              </div>
            ) : (
              <div className='flex items-center justify-center text-sm text-slate-500 flex-1'>
                최근 등록한 할 일이 없어요
              </div>
            )}
            <div className='absolute bottom-4 h-[51px] w-[calc(100%-48px)] bg-gradient-to-b from-white/0 to-white/100 pointer-events-none' />
          </>
        )}
      </div>
    </>
  );
}
