'use client';

import { NoteList } from '@/assets/svgs/NoteList';
import { Note } from '@/types/Note';
import Popover from '../Popover/Popover';
import { useRef, useState } from 'react';
import { ListTodoButtons } from '@/types/Todo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteRequest, getRequest } from '@/lib/api/api';
import NoteRead from '@/components/Note/NoteRead';
import { useRouter } from 'next/navigation';
import { queryKey } from '@/queries/query';
import ConfirmPopup from '../Popup/ConfirmPopup';

export default function CardNote({ noteList }: { noteList: Note[] }) {
  const confirmRef = useRef<HTMLDialogElement>(null);
  const noteRef = useRef<HTMLDialogElement>(null);
  const [confirm, setConfirm] = useState({ message: '', setDeleteId: 0 });
  const router = useRouter();
  const queryClient = useQueryClient();
  const [popupOpen, setPopupOpen] = useState<number | null>(null);
  const { mutate: deleteNoteMutate } = useMutation({
    mutationFn: (noteId: number) => deleteRequest({ url: `notes/${noteId}` }),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey.note(noteList[0].goal.id));
    },
  });
  const { data: noteData, mutate: noteMutate } = useMutation({
    mutationKey: ['getNote'],
    mutationFn: (id: number) => getRequest({ url: `notes/${id}` }),
    onSuccess: () => {
      if (!noteRef.current) return;
      noteRef.current.showModal();
    },
  });

  const handlePopupClick = (type: ListTodoButtons, id: number) => {
    const todoId = noteList.find((note) => note.id === id)?.todo.id;
    if (type === 'edit') {
      router.push(`/note/write/${todoId}`);
    }

    if (type === 'delete') {
      if (!confirmRef.current) return;
      setConfirm({ message: '정말로 삭제하시겠어요?', setDeleteId: id });
      confirmRef.current.showModal();
    }
  };

  const handleDeleteConfirmClick = (answer: 'ok' | 'cancel') => {
    if (answer === 'ok') {
      deleteNoteMutate(confirm.setDeleteId);
    }
  };
  return (
    <>
      <ConfirmPopup
        type='popup'
        dialogRef={confirmRef}
        confirmText={confirm.message}
        onConfirmClick={handleDeleteConfirmClick}
        confirm
      />
      <NoteRead dialogRef={noteRef} data={noteData} />
      {noteList.map((item) => (
        <button
          className='bg-white p-6 w-full max-w-[792px] border-[1px] rounded-xl text-left'
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
        </button>
      ))}
    </>
  );
}
