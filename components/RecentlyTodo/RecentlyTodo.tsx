'use client';

import { ArrowRight, Rectangles } from '@/assets/svgs';
import ListTodo from '../ListTodo/ListTodo';
import { ListTodoButtons, Todo } from '@/types/Todo';
import { deleteRequest, getRequest, patchRequest } from '@/api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Link from 'next/link';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import { Goal } from '@/types/Goal';
import { queryKey, useGetQuery } from '@/queries/query';

export default function RecentlyTodo({ goalList }: { goalList: Goal[] }) {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useGetQuery.todo();
  const { mutate: updateTodoMutate } = useMutation({
    mutationFn: ({ path, data }: { path: string; data: Todo }) => patchRequest({ url: `todos/${path}`, data }),
    onSuccess: () => queryClient.invalidateQueries(queryKey.todo()),
  });
  const { mutate: deleteTodoMutate } = useMutation({
    mutationFn: ({ path }: { path: string }) => deleteRequest({ url: `todos/${path}` }),
    onSuccess: () => queryClient.invalidateQueries(queryKey.todo()),
  });

  const handleButtonClick = (type: ListTodoButtons, id: number) => {
    const selecteItem = data?.todos.find((todo: Todo) => todo.id === id);
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

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <>
      <Modal onClose={() => setIsModalOpen(!isModalOpen)} isOpen={isModalOpen} modalType='edit' goalList={goalList} />
      <div className='relative w-full md:max-w-[588px] h-[250px] bg-white rounded-xl border-1 border-slate-100 px-6 py-4 flex flex-col gap-4'>
        <div className='flex justify-between'>
          <div className='flex items-center justify-center gap-2'>
            <div className='h-10 w-10 bg-blue-500 rounded-[15px] flex items-center justify-center'>
              <Rectangles />
            </div>
            <h2 className='text-slate-800 text-lg font-semibold'>최근 등록한 할 일</h2>
          </div>
          <Link href='/todolist' className='flex justify-center items-center'>
            <span className='text-sm outline-none'>모두 보기</span>
            <ArrowRight />
          </Link>
        </div>
        {data?.todos.length ? (
          <div className='h-[154px] overflow-y-auto pt-1'>
            <ListTodo showGoal todos={data?.todos} onButtonClick={handleButtonClick}></ListTodo>
          </div>
        ) : (
          <div className='h-[154px] flex items-center justify-center'>
            <p className='text-sm text-slate-500'>최근 등록한 할 일이 없어요</p>
          </div>
        )}
        <div className='absolute bottom-4 h-[51px] w-[calc(100%-48PX)] bg-gradient-to-b from-white/0 to-white/100 pointer-events-none' />
      </div>
    </>
  );
}
