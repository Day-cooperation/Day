'use client';

import { getRequest, patchRequest } from '@/api/api';
import { Plus } from '@/assets/svgs';
import Filter from '@/components/Filter/Filter';
import ListTodo from '@/components/ListTodo/ListTodo';
import { ListTodoButtons, Todo } from '@/types/Todo';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export default function TodoList() {
  const queryClient = useQueryClient();
  const [todoState, setTodoState] = useState('All');
  const { data: todoList, isPending } = useQuery({
    queryKey: ['get-todos'],
    queryFn: () => {
      getRequest({ url: 'todos' });
    },
  });
  const mutation = useMutation({
    mutationFn: ({ id, done }: { id: number; done: boolean }) =>
      patchRequest({ url: `todos/${id}`, data: { done: done } }),
    mutationKey: ['patch-done'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-todos'] });
    },
  });
  const title = `${todoState === 'all' ? '모든 할 일' : todoState === 'To do' ? '할 일' : '완료한 일'}(${todoList?.data.todos.length || 0})`;
  const todos =
    todoState === 'All'
      ? todoList?.data.todos
      : todoList?.data.todos.filter((item: Todo) => item.done === (todoState === 'To do' ? false : true));

  const handleTodoTypeClick = (buttonType: ListTodoButtons, id: number) => {
    if (buttonType === 'done') {
      const todo = todos.find((item: Todo) => id === item.id);
      mutation.mutate({ id, done: !todo.done });
      return;
    }
  };
  const handleFilterClick = (category: 'All' | 'To do' | 'Done') => {
    setTodoState(category);
  };

  if (isPending) <div>loading...</div>;
  return (
    <div className='w-full flex justify-center bg-slate-100'>
      <div className='w-full mx-auto max-w-[792px] flex flex-col gap-4 '>
        <div className='flex justify-between mt-6'>
          <h1 className='text-lg font-semibold text-slate-900'>{title}</h1>
          <button className='flex gap-1 items-center justify-center text-sm font-semibold text-blue-500'>
            <Plus strokeColor='currentColor' className='w-6 h-6' />
            할일 추가
          </button>
        </div>
        <div className='flex flex-col gap-4 bg-white w-full min-h-[988px] p-6 rounded-xl mb-6'>
          <Filter handleClick={handleFilterClick} />
          <ListTodo todos={todos} showGoal={false} onButtonClick={handleTodoTypeClick} />
        </div>
      </div>
    </div>
  );
}
