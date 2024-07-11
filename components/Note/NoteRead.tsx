import { Cancel, NoteFlag } from '@/assets/svgs';
import type { NoteRead } from '@/types/Note';
import { MouseEvent, RefObject } from 'react';

type NoteProps = {
  dialogRef: RefObject<HTMLDialogElement>;
  data?: NoteRead;
};

export default function NoteRead({ dialogRef, data }: NoteProps) {
  const createdAtSlice = data?.createdAt.slice(0, data?.createdAt.indexOf('T'));

  const handleClickClose = (e: MouseEvent) => {
    e.preventDefault();
    if (!dialogRef.current) return;
    dialogRef.current.close();
  };
  return (
    <dialog ref={dialogRef} className='bg-black/50'>
      <div className='fixed right-0 top-0 bg-white w-full max-w-[800px] h-full p-6'>
        <button className='p-[5px]' onClick={handleClickClose}>
          <Cancel className='w-[13px] h-[13px] mb-4' />
        </button>
        <div className='flex flex-col gap-3'>
          <div className='flex gap-1.5 items-center'>
            {data?.goal ? (
              <>
                <div className='bg-slate-800 p-1 rounded-md  '>
                  <NoteFlag className='w-6 h-6' />
                </div>
                <h2 className='text-slate-800 font-medium'>{data?.goal.title}</h2>
              </>
            ) : (
              <>
                <div className='bg-slate-800 p-1 rounded-md '>
                  <NoteFlag className='w-4 h-4 ' />
                </div>
                <h2 className='text-slate-500 font-medium'>등록된 목표가 없습니다.</h2>
              </>
            )}
          </div>
          <div className='flex justify-between '>
            <div className='flex gap-2 items-center mb-6'>
              <span className='bg-slate-100 rounded-[4px] py-0.5 px-[3px] text-xs font-medium text-slate-700'>
                {data?.todo.done === true ? 'Done' : 'To do'}
              </span>
              <span className='font-sm text-slate-700'>{data?.todo.title}</span>
            </div>
            <span className='text-xs text-slate-500'>{createdAtSlice?.replaceAll('-', '. ')}</span>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <h1 className='py-3 border-y-1 text-lg font-medium'>{data?.title}</h1>
          <p className='text-pretty text-slate-700 self-stretch'>{data?.content}</p>
        </div>
      </div>
    </dialog>
  );
}
