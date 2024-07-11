'use client';

import { getRequest } from '@/api/api';
import { Flag } from '@/assets/svgs';
import CardNote from '@/components/CardNote/CardNote';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function NoteList() {
  const { goalId } = useParams();
  const { data: goalResponse } = useQuery({
    queryKey: ['goal', goalId],
    queryFn: () => getRequest({ url: `goals/${goalId}` }),
  });

  const { data: noteList, isLoading } = useQuery({
    queryKey: ['noteList'],
    queryFn: () => getRequest({ url: 'notes', params: { goalId } }),
  });

  if (isLoading) return <h2>loading</h2>;
  return (
    <div className='p-4 md:p-6 flex flex-col gap-4 max-w-[792px]'>
      <h2 className='text-slate-900 text-lg font-semibold '>노트 모아보기</h2>
      <div className='flex items-center gap-2 py-[14px] px-6 bg-white rounded-xl border border-slate-100'>
        <div className='p-[4.8px] bg-black rounded-lg'>
          <Flag fill='white' width={14} height={14} />
        </div>
        <span className='text-slate-800 text-sm font-semibold'>{goalResponse?.data.title}</span>
      </div>
      {noteList?.data.notes.length ? (
        <CardNote noteList={noteList?.data.notes || []} />
      ) : (
        <div className='flex flex-col grow justify-center items-center'>
          <p className='text-slate-500 text-sm'>아직 등록된 노트가 없어요</p>
        </div>
      )}
    </div>
  );
}
