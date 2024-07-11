'use client';

import { getRequest } from '@/api/api';
import { ArrowRight, Flag, Kebab } from '@/assets/svgs';
import ListTodo from '@/components/ListTodo/ListTodo';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import { GoalsResponse } from '@/types/Goal';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function Goal() {
  const { goalId } = useParams();
  const { data: goalResponse } = useQuery({
    queryKey: ['goal', goalId],
    queryFn: () => getRequest({ url: `goals/${goalId}` }),
  });
  const { data: todoListResponse } = useQuery({
    queryKey: ['goalList', goalId],
    queryFn: () => getRequest({ url: 'todos', params: { goalId } }),
  });
  const { data: goalProgress, isLoading } = useQuery({
    queryKey: ['goalProgress', goalId],
    queryFn: () => getRequest({ url: 'todos/progress', params: { goalId } }),
  });
  {
    goalResponse?.data.title;
  }
  {
    goalProgress?.data.progress;
  }
  return (
    <div className='p-6 w-full flex flex-col gap-4'>
      <h2 className='text-slate-900 text-lg font-semibold'>목표</h2>
      <div className='flex flex-col gap-6'>
        <div className=' bg-white border border-slate-100 rounded-xl px-6 py-4 flex flex-col gap-6'>
          <div className='flex max-w-[1200px] justify-between'>
            <div>
              <div className='flex items-center gap-2'>
                <div className='p-2 bg-black rounded-[15px]'>
                  <Flag fill='white' />
                </div>
                <span className='text-slate-800 text-lg font-semibold'>{goalResponse?.data.title}</span>
              </div>
            </div>
            <button>
              <Kebab fill='white' />
            </button>
          </div>
          <div className='flex flex-col gap-2'>
            <span className='text-slate-900 text-xs font-semibold'>Progress</span>
            <div className='-mx-2'>
              <ProgressBar value={isLoading ? 0 : goalProgress?.data.progress} />
            </div>
          </div>
        </div>

        <div className='bg-blue-100 rounded-xl flex justify-between px-6 py-4'>
          <div>
            노트 <span>노드 모아보기</span>
          </div>
          <button>
            <ArrowRight />
          </button>
        </div>

        <div className='flex'>
          <div className='max-w-[588px] w-full bg-white px-6 py-4'>
            <div className='flex'>
              <h3>To do</h3>
              <button>할일 추가</button>
            </div>
            <ListTodo
              onButtonClick={() => {}}
              showGoal={false}
              todos={todoListResponse?.data.todos.filter((todo) => todo.done === false)}
            />
          </div>
          <div className='max-w-[588px] w-full bg-slate-200 px-6 py-4'>
            <h3>Done</h3>
            <ListTodo
              onButtonClick={() => {}}
              showGoal={false}
              todos={todoListResponse?.data.todos.filter((todo) => todo.done === true)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
