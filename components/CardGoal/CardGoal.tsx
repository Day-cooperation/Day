'use client';

import { Todo } from '@/types/Todo';
import { useEffect, useState } from 'react';
import { IcArrowDown, Plus } from '@/assets/svgs';
import ProgressBar from '../ProgressBar/ProgressBar';
import ListTodoProgress from './ListTodoProgress';

type CardGoalProps = {
  list: Todo[];
};

export default function CardGoal({ list }: CardGoalProps) {
  const [todoList, setTodoList] = useState(list);
  const [progress, setProgress] = useState(0);
  const doneList = todoList.filter((item) => item.done === true);
  const incompleteList = todoList.filter((item) => item.done === false);

  const onUpdateList = (buttonType: string, id: number) => {
    if (buttonType === 'done') {
      setTodoList((prev) => prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
    }
  };

  //진행도는 추후 백엔드 API로 받을 예정
  useEffect(() => {
    const progress = (doneList.length / todoList.length) * 100;
    setProgress(progress);
  }, [todoList]);

  return (
    <div className='flex w-[568px] h-[352px] p-6 flex-col gap-4 justify-start bg-blue-50 rounded-[32px]'>
      <div className='flex flex-col gap-2'>
        <div className='flex justify-between'>
          <h1 className='text-lg font-bold'>{list?.[0]?.goal?.title || '등록한 목표가 없습니다.'}</h1>
          <button className='flex items-center gap-1 text-sm font-semibold text-blue-500'>
            <Plus strokeColor='currentColor' className='w-4 h-4' />
            할일 추가
          </button>
        </div>
        <ProgressBar value={progress} />
      </div>
      <div className='grid grid-cols-2 gap-6'>
        <ListTodoProgress itemList={incompleteList} onUpdateList={onUpdateList} textValue={'아직 해야할 일이 없어요'} />
        <ListTodoProgress itemList={doneList} onUpdateList={onUpdateList} textValue={'아직 다 한 일이 없어요'} />
      </div>
      <div className='flex justify-center min-h-0'>
        <button className='flex items-center justify-center text-xs font-semibold py-1  gap-2 bg-white pr-[21px] pl-[36px] rounded-2xl'>
          더보기
          <IcArrowDown className='w-6 h-6' />
        </button>
      </div>
    </div>
  );
}
