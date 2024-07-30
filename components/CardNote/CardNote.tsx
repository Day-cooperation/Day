'use client';

import { NoteList } from '@/assets/svgs/NoteList';
import { Note } from '@/types/Note';
import Popover from '../Popover/Popover';
import { useRef, useState } from 'react';
import { ListTodoButtons } from '@/types/Todo';
import { useMutation } from '@tanstack/react-query';
import { getRequest } from '@/lib/api/api';
import NoteRead from '@/components/Note/NoteRead';
import ConfirmPopup from '../Popup/ConfirmPopup';
import { useListTodo } from '@/hooks/useListTodo';

export default function CardNote({ noteList }: { noteList: Note[] }) {
  const { confirm, confirmRef, handleListPopupClick, handleDeleteConfirmClick } = useListTodo(noteList[0].goal.id);
  const noteRef = useRef<HTMLDialogElement>(null);
  const [popupOpen, setPopupOpen] = useState<number | null>(null);

  const { data: noteData, mutate: noteMutate } = useMutation({
    mutationKey: ['getNote'],
    mutationFn: (id: number) => getRequest({ url: `notes/${id}` }),
    onSuccess: () => {
      if (!noteRef.current) return;
      noteRef.current.showModal();
    },
  });

  const handlePopupClick = (type: ListTodoButtons, id: number) => {
    if (type === 'delete') {
      handleListPopupClick('note delete', id);
      return;
    }
    const todoId = noteList.find((note) => note.id === id)?.todo.id;
    handleListPopupClick('note write', Number(todoId));
  };

  const handleConfirmClick = (answer: 'ok' | 'cancel') => {
    if (answer === 'ok') {
      handleDeleteConfirmClick(answer, 'note');
    }
  };
  return (
    <>
      <ConfirmPopup
        type={confirm.type}
        dialogRef={confirmRef}
        confirmText={confirm.message}
        onConfirmClick={handleConfirmClick}
        confirm
      />
      <NoteRead dialogRef={noteRef} data={noteData} />
      {noteList.map((item) => (
        <div
          key={item.id}
          className='bg-white p-6 w-full max-w-[792px] border-[1px] rounded-xl text-left cursor-pointer'
          onClick={() => noteMutate(item.id)}
        >
          <div className='flex justify-between items-center mb-4'>
            <div className='bg-blue-100 w-7 h-7 rounded-[8.4px] flex items-center justify-center'>
              <NoteList />
            </div>
            <Popover
              isGoal
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
