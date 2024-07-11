'use client';

import { deleteRequest, getRequest, patchRequest } from '@/api/api';
import { ArrowRight, Flag, Kebab, Plus } from '@/assets/svgs';
import { NoteAndPen } from '@/assets/svgs/NoteAndPen';
import MixedInput from '@/components/Input/MixedInput';
import ListTodo from '@/components/ListTodo/ListTodo';
import Modal from '@/components/Modal/Modal';
import Popover from '@/components/Popover/Popover';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import { ListTodoButtons, Todo } from '@/types/Todo';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { KeyboardEvent, useState } from 'react';

export default function Goal() {
  const route = useRouter();
  const queryClient = useQueryClient();
  const [isGoalTitleEdit, setIsGoalTitleEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit'>('create');

  const { goalId } = useParams();
  const [popupOpen, setPopupOpen] = useState<number | null>(null);

  const { data: goalResponse } = useQuery({
    queryKey: ['goal', goalId],
    queryFn: () => getRequest({ url: `goals/${goalId}` }),
  });
  const [goalTitle, setGoalTitle] = useState(goalResponse?.data.title);
  const { data: todoListResponse } = useQuery({
    queryKey: ['todoList', goalId],
    queryFn: () => getRequest({ url: 'todos', params: { goalId } }),
  });
  const { data: goalProgress, isLoading } = useQuery({
    queryKey: ['goalProgress', goalId],
    queryFn: () => getRequest({ url: 'todos/progress', params: { goalId } }),
  });

  const handleAddTodo = () => {
    setModalType('create');
    setIsModalOpen(!isModalOpen);
  };

  const { mutate: updateTodoMutate } = useMutation({
    mutationFn: ({ path, data }: { path: string; data: Todo }) => patchRequest({ url: `todos/${path}`, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todoList', goalId] });
      queryClient.invalidateQueries({ queryKey: ['goalProgress', goalId] });
    },
  });

  const { mutate: deleteTodoMutate } = useMutation({
    mutationFn: ({ path }: { path: string }) => deleteRequest({ url: `todos/${path}` }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todoList'] }),
  });

  const { mutate: deleteGoalMutate } = useMutation({
    mutationFn: ({ path }: { path: string }) => deleteRequest({ url: `goals/${path}` }),
    onSuccess: () => {
      route.push('/dashboard');
      return <div>loading...</div>;
    },
  });

  const { mutate: updateGoalMutate } = useMutation({
    mutationFn: (input: string) => patchRequest({ url: `goals/${goalId}`, data: { title: input } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['goal', goalId] }),
  });

  const handleButtonClick = (type: ListTodoButtons, id: number) => {
    const selecteItem = todoListResponse?.data.todos.filter((todo: Todo) => todo.id === id)[0];
    if (type === 'done') {
      updateTodoMutate({ path: String(selecteItem.id), data: { ...selecteItem, done: !selecteItem.done } });
    }
    if (type === 'delete') {
      deleteTodoMutate({ path: String(selecteItem.id) });
    }
    if (type === 'edit') {
      setIsModalOpen(!isModalOpen);
    }
  };

  const handleKeydownInput = (e: KeyboardEvent<HTMLInputElement> | KeyboardEvent) => {
    if (e.key === 'Escape') {
      setGoalTitle(goalTitle);
      setIsGoalTitleEdit(false);
    }
    if (e.key === 'Enter') {
      updateGoalMutate(goalTitle);
      setGoalTitle(goalTitle);

      setIsGoalTitleEdit(false);
    }
  };

  const handlePopupClick = (type: ListTodoButtons, id: number) => {
    if (type === 'edit') {
      setIsGoalTitleEdit(true);
    }

    if (type === 'delete') {
      deleteGoalMutate({ path: goalId as string });
    }
  };

  const todoList = todoListResponse?.data.todos.filter((todo: Todo) => todo.done === false) || [];
  const doneList = todoListResponse?.data.todos.filter((todo: Todo) => todo.done === true) || [];

  return (
    <>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          modalType={modalType}
          onClose={() => setIsModalOpen(!isModalOpen)}
          goalList={[goalResponse?.data]}
        />
      )}
      <div className='p-4 md:p-6 flex flex-col gap-4 max-w-[1200px] mx-auto w-full'>
        <h2 className='text-slate-900 text-lg font-semibold '>목표</h2>
        <div className='flex flex-col gap-4 md:gap-6 '>
          <div className=' bg-white border border-slate-100 rounded-xl px-6 py-4 flex flex-col gap-6'>
            <div className='flex max-w-[1200px] justify-between'>
              <div>
                <div className='flex items-center gap-2'>
                  <div className='p-2 bg-black rounded-[15px]'>
                    <Flag fill='white' />
                  </div>
                  {isGoalTitleEdit ? (
                    <MixedInput
                      size='full'
                      name='goal'
                      type='text'
                      value={goalTitle}
                      handleChange={(e) => setGoalTitle(e.target.value)}
                      handleKeyDown={handleKeydownInput}
                    />
                  ) : (
                    <span className='text-slate-800 text-lg font-semibold'>{goalResponse?.data.title}</span>
                  )}
                </div>
              </div>
              <Popover
                isGoal={true}
                goal={false}
                item={goalResponse?.data || []}
                handlePopupClick={handlePopupClick}
                openPopupId={popupOpen}
                setOpenPopupId={setPopupOpen}
              />
            </div>
            <div className='flex flex-col gap-2 '>
              <span className='text-slate-900 text-xs font-semibold'>Progress</span>
              <div className='-mx-2'>
                <ProgressBar value={isLoading ? 0 : goalProgress?.data.progress} />
              </div>
            </div>
          </div>

          <Link href={`/notes/${goalId}`} className='bg-blue-100 rounded-xl flex justify-between px-6 py-4 '>
            <div className='flex gap-[5px] items-center'>
              <NoteAndPen />
              <span className='text-slate-800 font-bold text-lg'>노트 모아보기</span>
            </div>
            <ArrowRight />
          </Link>

          <div className='flex flex-col lg:flex-row gap-6 '>
            <div className='flex flex-col lg:max-w-[588px] min-h-[228px] w-full bg-white px-6 py-4 rounded-xl gap-4'>
              <div className='flex justify-between'>
                <h3 className='text-slate-800 text-lg font-bold'>To do</h3>
                <button className='flex items-center gap-1 text-sm font-semibold text-blue-500' onClick={handleAddTodo}>
                  <Plus strokeColor='currentColor' className='w-4 h-4' />
                  할일 추가
                </button>
              </div>
              {todoList.length ? (
                <ListTodo onButtonClick={handleButtonClick} showGoal={false} todos={todoList} />
              ) : (
                <div className='flex items-center justify-center h-full'>
                  <p className='text-slate-500 text-sm'>해야할 일이 아직 없어요</p>
                </div>
              )}
            </div>
            <div className='flex flex-col gap-4 lg:max-w-[588px] min-h-[228px] w-full bg-slate-200 px-6 py-4 rounded-xl'>
              <h3 className='text-slate-800 text-lg font-bold'>Done</h3>
              {doneList.length ? (
                <ListTodo onButtonClick={handleButtonClick} showGoal={false} todos={doneList} />
              ) : (
                <div className='flex items-center justify-center h-full'>
                  <p className='text-slate-500 text-sm'>해야할 일이 아직 없어요</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
