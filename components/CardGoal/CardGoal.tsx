'use client';

import { Todo } from '@/types/Todo';
import ListTodo from '../ListTodo/ListTodo';
import { useEffect, useState } from 'react';
import { IcArrowDown, Plus } from '@/assets/svgs';
import ProgressBar from '../ProgressBar/ProgressBar';

type CardGoalProps = {
  list: Todo[];
};

export default function CardGoal({ list }: CardGoalProps) {
  const [todoList, setTodoList] = useState(list || []);
  const [progress, setProgress] = useState(0);
  const doneList = todoList.filter((item) => item.done === true);
  const incompleteList = todoList.filter((item) => item.done === false);

  useEffect(() => {
    const progress = (doneList.length / todoList.length) * 100;
    setProgress(progress);
  }, [todoList]);

  return (
    <div className='flex w-[568px] h-[352px] p-6 flex-col gap-4 justify-start bg-blue-50 rounded-[32px]'>
      <div className='flex flex-col gap-2'>
        <div className='flex justify-between'>
          <h1 className='text-lg font-bold'>{list[0].goal?.title}</h1>
          <button className='flex items-center gap-1 text-sm font-semibold text-blue-500'>
            <Plus strokeColor='currentColor' className='w-4 h-4' />
            할일 추가
          </button>
        </div>
        <ProgressBar value={progress} />
      </div>
      <div className='grid grid-cols-2 gap-6'>
        <div className='flex flex-col gap-3 h-[184px]'>
          <span className='text-sm font-semibold text-slate-800'>To do</span>
          {incompleteList.length !== 0 ? (
            <ListTodo
              todos={incompleteList}
              goalHidden
              viewLength={5}
              onButtonClick={(buttonType, id) => {
                if (buttonType === 'done') {
                  setTodoList((prev) => prev.map((item) => (item.id === id ? { ...item, done: true } : item)));
                }
              }}
            />
          ) : (
            <span className='text-xs text-slate-500'>아직 해야할 일이 없어요</span>
          )}
        </div>
        <div className='flex flex-col'>
          <span className='text-sm font-semibold text-slate-800'>Done</span>
          {doneList.length !== 0 ? (
            <ListTodo
              todos={doneList}
              viewLength={5}
              goalHidden
              onButtonClick={(buttonType, id) => {
                if (buttonType === 'done') {
                  setTodoList((prev) => prev.map((item) => (item.id === id ? { ...item, done: false } : item)));
                }
              }}
            />
          ) : (
            <span className='text-xs text-slate-500'>아직 다 한 일이 없어요</span>
          )}
        </div>
      </div>
      <div className='flex justify-center h-8'>
        <button className='flex items-center justify-center gap-2 bg-white py-1.5 pr-[21px] pl-[36px] rounded-2xl'>
          더보기
          <IcArrowDown className='w-6 h-6' />
        </button>
      </div>
    </div>
  );
}
