'use client';

import { ListTodoButtons, Todo } from '@/types/Todo';
import { useEffect, useState } from 'react';
import { IcArrowDown, Plus } from '@/assets/svgs';
import ProgressBar from '../ProgressBar/ProgressBar';
import ListTodoProgress from './ListTodoProgress';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteRequest, getRequest, patchRequest } from '@/api/api';
import { Goal } from '@/types/Goal';
import Modal from '../Modal/Modal';

export default function CardGoal({ goal, goalList }: { goal: Goal; goalList: Goal[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const [modalType, setModalType] = useState<'create' | 'edit'>('create');
  const { data, isLoading, error } = useQuery({
    queryKey: ['todoList', goal.id],
    queryFn: () => getRequest({ url: `todos`, params: { goalId: goal.id } }),
  });

  const { data: progressData, isLoading: ProgressisLoading } = useQuery({
    queryKey: ['goalProgress', goal.id],
    queryFn: () => getRequest({ url: 'todos/progress', params: { goalId: goal.id } }),
  });
  const todoList = data?.data.todos.filter((todo: Todo) => todo.done === false);
  const doneList = data?.data.todos.filter((todo: Todo) => todo.done === true);
  // const [todoList, setTodoList] = useState([]);
  // const { mutate } = useMutation({
  //   mutationKey: ['todoList'],
  //   mutationFn: ({ id, data }) => patchRequest({ url: 'todos', params: id, data }),
  // });
  const [isMore, setIsMore] = useState(false);
  const { mutate: updateTodoMutate } = useMutation({
    mutationFn: ({ path, data }: { path: string; data: Todo }) => patchRequest({ url: `todos/${path}`, data }),
    // 성공했을때 querykey 초기화 시켜줘야하나??
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todoList', goal.id] });
      queryClient.invalidateQueries({ queryKey: ['goalProgress', goal.id] });
    },
  });

  const { mutate: deleteTodoMutate } = useMutation({
    mutationFn: ({ path }: { path: string }) => deleteRequest({ url: `todos/${path}` }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todoList'] }),
  });
  const handleMoreClick = () => {
    setIsMore(!isMore);
  };

  const handleAddTodo = () => {
    setModalType('create');
    setIsModalOpen(!isModalOpen);
  };

  const handleButtonClick = (type: string, id: number) => {
    const selecteItem = data?.data.todos.filter((todo: Todo) => todo.id === id)[0];
    if (type === 'done') {
      updateTodoMutate({ path: String(selecteItem.id), data: { ...selecteItem, done: !selecteItem.done } });
    }
    if (type === 'delete') {
      deleteTodoMutate({ path: String(selecteItem.id) });
    }
    if (type === 'edit') {
      setModalType('edit');
      setIsModalOpen(!isModalOpen);
    }
  };

  if (isLoading || ProgressisLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error loading data</h2>;
  return (
    <>
      {isModalOpen && (
        <Modal
          modalTodoState
          isOpen={isModalOpen}
          modalType={modalType}
          onClose={() => setIsModalOpen(!isModalOpen)}
          goalList={goalList}
        />
      )}
      <div className='flex w-full p-6 flex-col gap-4 justify-start bg-blue-50 rounded-[32px] [&:nth-child(3)]:col-span-2 '>
        <div className='flex flex-col gap-2'>
          <div className='flex justify-between'>
            <h1 className='text-lg font-bold'>{goal.title}</h1>
            <button className='flex items-center gap-1 text-sm font-semibold text-blue-500' onClick={handleAddTodo}>
              <Plus strokeColor='currentColor' className='w-4 h-4' />
              할일 추가
            </button>
          </div>
          <ProgressBar value={progressData?.data.progress || 0} />
        </div>
        <div className='grid grid-cols-2 gap-6'>
          <ListTodoProgress
            subject='To do'
            itemList={todoList}
            onUpdateList={handleButtonClick}
            textValue={'아직 해야할 일이 없어요'}
          />
          <ListTodoProgress
            subject='Done'
            itemList={doneList}
            onUpdateList={handleButtonClick}
            textValue={'아직 다 한 일이 없어요'}
          />
        </div>
        {todoList.length > 4 ||
          (doneList.length > 4 && (
            <div className='flex justify-center min-h-0'>
              <button
                className='flex items-center justify-center text-xs font-semibold py-1 gap-2 bg-white pr-[21px] pl-[36px] rounded-2xl'
                onClick={handleMoreClick}
              >
                더보기
                <IcArrowDown className='w-6 h-6' />
              </button>
            </div>
          ))}
      </div>
    </>
  );
}
