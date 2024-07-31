'use client';

import { Flag } from '@/assets/svgs';
import CardNote from '@/components/CardNote/CardNote';
import { useGetQuery } from '@/queries/query';
import { Spinner } from '@nextui-org/react';
import { useParams } from 'next/navigation';

export default function NoteList() {
  const { goalId } = useParams();
  const { data: goalResponse } = useGetQuery.goal(Number(goalId));
  const { data: noteResponse, isLoading } = useGetQuery.note(Number(goalId));

  return (
    <div className='p-4 md:p-6 flex flex-col h-full gap-4 max-w-[792px] relative'>
      {isLoading ? (
        <Spinner className='absolute top-[calc(50%-16px)] left-[calc(50%-16px)]' />
      ) : (
        <>
          <h2 className='text-slate-900 text-lg font-semibold '>노트 모아보기</h2>
          <div className='flex items-center gap-2 py-[14px] px-6 bg-white rounded-xl border border-slate-100'>
            <div className='p-[4.8px] bg-green-500 rounded-lg'>
              <Flag fill='white' width={14} height={14} />
            </div>
            <span className='text-slate-800 text-sm font-semibold'>{goalResponse?.title}</span>
          </div>
          {noteResponse?.notes?.length ? (
            <CardNote noteList={noteResponse?.notes || []} />
          ) : (
            <div className='flex flex-col h-[calc(100vh-178px)] md:h-full justify-center items-center'>
              <p className='text-slate-500 text-sm'>아직 등록된 노트가 없어요</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
