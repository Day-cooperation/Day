'use client';
import { getRequest } from '@/api/api';
import CardGoal from '@/components/CardGoal/CardGoal';
import { Goal } from '@/types/Goal';
import { useQuery } from '@tanstack/react-query';

import { Flag } from '@/assets/svgs';
import RecentlyTodo from '@/components/RecentlyTodo/RecentlyTodo';

export default function Dashboard() {
  const { data: goalListReseponse, isLoading } = useQuery({
    queryKey: ['goalList'],
    queryFn: () => getRequest({ url: 'goals' }),
  });

  if (isLoading) return <h1>loading...</h1>;
  return (
    <div className='flex flex-col p-4 md:p-6 items-stretch max-w-[1200px] md:gap-3'>
      <h1 className='text-left max-w-full hidden md:block text-slate-900 text-lg font-semibold'>대시보드</h1>
      <main className=' flex flex-col md:gap-6 gap-4'>
        <div className='flex flex-col md:flex-row md:gap-6 gap-4'>
          <div className='w-full'>
            <RecentlyTodo goalList={goalListReseponse?.data.goals} />
          </div>
          <div className=' h-[250px] w-full md:max-w-[588px] bg-blue-500 rounded-xl'></div>
        </div>
        <div className='w-full max-w-[1200px] bg-white rounded-xl py-4 px-6 min-h-[calc(100vh-612px)] md:min-h-[calc(100vh-362px)]'>
          <div className='flex justify-start gap-[6px] items-center mb-4'>
            <div className='w-10 h-10 rounded-[15px] bg-[#F97316] flex items-center justify-center'>
              <Flag fill='white' />
            </div>
            <h2 className='text-slate-800 text-lg font-semibold'>목표 별 할 일</h2>
          </div>
          <div className='lg:grid lg:grid-cols-2 gap-4 flex flex-col'>
            {goalListReseponse?.data.goals.map((goal: Goal, index: number) => {
              if (index >= 3) return;
              return <CardGoal key={goal.id} goal={goal} index={index} />;
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
