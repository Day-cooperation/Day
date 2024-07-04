'use client';

import { NoteList } from '@/assets/svgs/NoteList';
import { Kebab } from '@/assets/svgs/Kebab';
import { Note } from '@/types/Note';

export default function CardNote({ noteList }: { noteList: Note[] }) {
  return (
    <>
      {noteList.map((item) => (
        <div className='bg-white p-6 w-full max-w-[792px] border-[1px] rounded-xl'>
          <div className='flex justify-between items-center mb-4'>
            <div className='bg-blue-100 w-7 h-7 rounded-[8.4px] flex items-center justify-center'>
              <NoteList />
            </div>
            <button type='button' onClick={() => {}}>
              <Kebab />
            </button>
          </div>
          <div className='flex flex-col gap-3'>
            <h2 className='text-slate-800 text-lg'>{item.title}</h2>
            <hr />
            <div className='flex gap-2 items-center'>
              <span className='bg-slate-100 text-slate-700 text-xs rounded py-[2px] px-[3px]'>To do</span>
              <span className='text-xs font-normal'>{item.todo.title}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
