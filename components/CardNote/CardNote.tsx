'use client';

import { NoteList } from '@/assets/svgs/NoteList';
import { Kebab } from '@/assets/svgs/Kebab';
import { Note } from '@/types/Note';
import Popover from '../Popover/Popover';
import { useState } from 'react';
import { ListTodoButtons } from '@/types/Todo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteRequest } from '@/api/api';
import { useRouter } from 'next/navigation';

export default function CardNote({ noteList }: { noteList: Note[] }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [popupOpen, setPopupOpen] = useState<number | null>(null);
  const { mutate: deleteNoteMutate } = useMutation({
    mutationFn: (noteId: number) => deleteRequest({ url: `notes/${noteId}` }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['noteList'] });
    },
  });

  const handlePopupClick = (type: ListTodoButtons, id: number) => {
    if (type === 'note read') {
      // 추가
    }
    if (type === 'edit') {
      router.push(`/notes/${id}/edit`);
    }

    if (type === 'delete') {
      deleteNoteMutate(id);
    }
  };

  return (
    <>
      {noteList.map((item) => (
        <div className='bg-white p-6 w-full max-w-[792px] border-[1px] rounded-xl'>
          <div className='flex justify-between items-center mb-4'>
            <div className='bg-blue-100 w-7 h-7 rounded-[8.4px] flex items-center justify-center'>
              <NoteList />
            </div>
            <Popover
              isGoal
              noteId={true}
              item={item}
              handlePopupClick={handlePopupClick}
              openPopupId={popupOpen}
              setOpenPopupId={setPopupOpen}
            />
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
