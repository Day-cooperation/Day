'use client';

import { ArrowRight, Rectangles } from '@/assets/svgs';
import ListTodo from '../ListTodo/ListTodo';
import { Todo } from '@/types/Todo';

export default function RecentlyTodo({ todoList }: { todoList: Todo[] }) {
  return (
    <div className='relative w-full max-w-[588px] h-[250px] bg-white rounded-xl border-1 border-slate-100 px-6 py-4 flex flex-col gap-4'>
      <div className='flex justify-between'>
        <div className='flex items-center justify-center gap-2'>
          <div className='h-10 w-10 bg-blue-500 rounded-[15px] flex items-center justify-center'>
            <Rectangles />
          </div>
          <h2 className='text-slate-800 text-lg font-semibold'>최근 등록한 할 일</h2>
        </div>
        <button className='flex justify-center items-center'>
          <span className='text-sm outline-none'>모두 보기</span>
          <ArrowRight />
        </button>
      </div>
      <div className='w-full h-[154px] overflow-y-auto pt-1'>
        <ListTodo showGoal todos={todoList} onButtonClick={(type, id) => {}}></ListTodo>
      </div>
      <div className='absolute bottom-4 h-[51px] w-[calc(100%-48PX)] bg-gradient-to-b from-white/0 to-white/100 pointer-events-none' />
    </div>
  );
}
