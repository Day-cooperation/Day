'use client';

import { Plus } from '@/assets/svgs';
import Filter from '@/components/Filter/Filter';
import ListTodo from '@/components/ListTodo/ListTodo';
import Modal from '@/components/Modal/Modal';
import NoteRead from '@/components/Note/NoteRead';
import ConfirmPopup from '@/components/Popup/ConfirmPopup';
import { useListTodo } from '@/hooks/useListTodo';
import { Todo } from '@/types/Todo';
import { Spinner } from '@nextui-org/react';
import { useState } from 'react';

export default function TodoList() {
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
    onOpen,
    setModalType,
  } = useListTodo();

  const [todoState, setTodoState] = useState('All');

  const todos =
    todoState === 'All'
      ? todoResponse?.todos
      : todoResponse?.todos.filter((item: Todo) => item.done === (todoState === 'To do' ? false : true));
  const pageTitle = `${todoState === 'All' ? '모든 할 일' : todoState === 'To do' ? '할 일' : '완료한 일'}(${todos?.length || 0})`;

  const handleFilterClick = (category: 'All' | 'To do' | 'Done') => {
    setTodoState(category);
  };

  return (
    <>
      <ConfirmPopup
        type='popup'
        dialogRef={confirmRef}
        confirmText={confirm.message}
        onConfirmClick={handleDeleteConfirmClick}
        confirm
      />
      <NoteRead dialogRef={noteRef} data={noteData} />
      <Modal modalType={modalType} isOpen={isOpen} items={todo} onClose={onClose} />
      <div className='relative w-full p-4 md:p-6 bg-slate-100 h-full'>
        <div className='w-full max-w-[792px] flex flex-col gap-4 h-full'>
          <div className='flex justify-between'>
            <h1 className='text-lg font-semibold text-slate-900'>{pageTitle}</h1>
            <button
              className='flex gap-1 items-center justify-center text-sm font-semibold text-blue-500'
              onClick={() => {
                onOpen();
                setModalType('create');
              }}
            >
              <Plus strokeColor='currentColor' className='w-6 h-6' />
              할일 추가
            </button>
          </div>
          <div className='flex flex-col gap-4 bg-white w-full min-h-[calc(100vh-130px)] md:min-h-[calc(100vh-92px)] p-6 rounded-xl'>
            {isLoading ? (
              <Spinner className='absolute top-[calc(50%-16px)] left-[calc(50%-16px)]' />
            ) : (
              <>
                <Filter handleClick={handleFilterClick} />
                <ListTodo todos={todos} showGoal={true} onButtonClick={handleListPopupClick} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
