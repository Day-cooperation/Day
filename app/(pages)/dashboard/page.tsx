'use client';
import CardGoal from '@/components/CardGoal/CardGoal';
import { Goal } from '@/types/Goal';
import { Flag } from '@/assets/svgs';
import RecentlyTodo from '@/components/RecentlyTodo/RecentlyTodo';
import { useGetQuery } from '@/queries/query';
import { Spinner } from '@nextui-org/react';

export default function Dashboard() {
  const { data: goalListReseponse, isLoading } = useGetQuery.goal();
  return (
    <div className='flex flex-col p-4 md:p-6 items-stretch max-w-[1200px] md:gap-3'>
      <h1 className='text-left max-w-full hidden md:block text-slate-900 text-lg font-semibold'>대시보드</h1>
      <main className=' flex flex-col md:gap-6 gap-4'>
        <div className='w-full'>
          <RecentlyTodo />
        </div>
        <div className='w-full relative max-w-[1200px] bg-white rounded-xl py-4 px-6 min-h-[calc(100vh-612px)] md:min-h-[calc(100vh-362px)]'>
          <div className='flex justify-start gap-[6px] items-center mb-4'>
            <div className='w-10 h-10 rounded-[15px] bg-green-500 flex items-center justify-center'>
              <Flag fill='white' />
            </div>
            <h2 className='text-slate-800 text-lg font-semibold'>목표 별 할 일</h2>
          </div>
          {isLoading ? (
            <Spinner className='absolute top-[calc(50%-16px)] left-[calc(50%-16px)]' />
          ) : (
            <div className='lg:grid lg:grid-cols-2 gap-4 flex flex-col'>
              {goalListReseponse.goals.map((goal: Goal, index: number) => {
                if (index >= 3) return;
                return <CardGoal key={goal.id} goal={goal} index={index} />;
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
