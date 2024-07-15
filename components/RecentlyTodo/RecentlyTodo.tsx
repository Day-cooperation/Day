'use client';

import { ArrowRight, Rectangles } from '@/assets/svgs';
import ListTodo from '../ListTodo/ListTodo';
import { ListTodoButtons, Todo } from '@/types/Todo';
import { deleteRequest, getRequest, patchRequest } from '@/api/api';
import NoteRead from '@/components/Note/NoteRead';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Link from 'next/link';
import { useRef, useState } from 'react';
import Modal from '../Modal/Modal';
import { Goal } from '@/types/Goal';
import { queryKey, useGetQuery } from '@/queries/query';
import ConfirmPopup from '../Popup/ConfirmPopup';
import { useDisclosure } from '@nextui-org/react';

export default function RecentlyTodo({ goalList }: { goalList: Goal[] }) {
  const confirmRef = useRef<HTMLDialogElement>(null);
  const noteRef = useRef<HTMLDialogElement>(null);
  const [modalType, setModalType] = useState<'create' | 'edit'>('create');
  const [confirm, setConfirm] = useState({ message: '', setDeleteId: 0 });
  const [todo, setTodo] = useState();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const queryClient = useQueryClient();

  const { data: todoResponse, isLoading } = useGetQuery.todo();

  const { data: noteData, mutate: noteMutate } = useMutation({
    mutationKey: ['getNote'],
    mutationFn: (id) => getRequest({ url: `notes/${id}` }),
    onSuccess: () => {
      if (!noteRef.current) return;
      noteRef.current.showModal();
    },
  });

  const { mutate: updateTodoMutate } = useMutation({
    mutationFn: ({ path, data }: { path: string; data: Todo }) => patchRequest({ url: `todos/${path}`, data }),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey.todo());
      goalList.forEach((goal) => {
        queryClient.invalidateQueries(queryKey.todo(goal.id));
        queryClient.invalidateQueries(queryKey.progress(goal.id));
      });
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: (id: number) => deleteRequest({ url: `todos/${id}` }),
    onSuccess: () => {
      setConfirm({ message: '', setDeleteId: 0 });
      queryClient.invalidateQueries(queryKey.todo());
      goalList.forEach((goal) => {
        queryClient.invalidateQueries(queryKey.todo(goal.id));
        queryClient.invalidateQueries(queryKey.progress(goal.id));
      });
    },
  });

  const handleButtonClick = (type: ListTodoButtons, id: number) => {
    const selecteItem = todoResponse?.todos.find((todo: Todo) => todo.id === id);
    if (type === 'done') {
      updateTodoMutate({ path: String(selecteItem.id), data: { ...selecteItem, done: !selecteItem.done } });
    }
    if (type === 'delete') {
      if (!confirmRef.current) return;
      setConfirm({ message: '정말로 삭제하시겠어요?', setDeleteId: id });
      confirmRef.current.showModal();
    }
    if (type === 'edit') {
      setModalType('edit');
      setTodo(selecteItem);
      onOpen();
    }
    if (type === 'note read') {
      noteMutate(selecteItem.noteId);
    }
  };

  const handleDeleteConfirmClick = (answer: 'ok' | 'cancel') => {
    if (answer === 'ok') {
      deleteMutate(confirm.setDeleteId);
    }
  };
  if (isLoading) return <h2>Loading...</h2>;

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
      <Modal onClose={onClose} isOpen={isOpen} modalType={modalType} items={todo} />
      <div className='relative w-full md:max-w-[588px] h-[250px] bg-white rounded-xl border-1 border-slate-100 px-6 py-4 flex flex-col gap-4'>
        <div className='flex justify-between'>
          <div className='flex items-center justify-center gap-2'>
            <div className='h-10 w-10 bg-blue-500 rounded-[15px] flex items-center justify-center'>
              <Rectangles />
            </div>
            <h2 className='text-slate-800 text-lg font-semibold'>최근 등록한 할 일</h2>
          </div>
          <Link href='/todolist' className='flex justify-center items-center'>
            <span className='text-sm outline-none'>모두 보기</span>
            <ArrowRight />
          </Link>
        </div>
        {todoResponse?.todos.length ? (
          <div className='h-[154px] overflow-y-auto pt-1'>
            <ListTodo showGoal todos={todoResponse?.todos} onButtonClick={handleButtonClick}></ListTodo>
          </div>
        ) : (
          <div className='h-[154px] flex items-center justify-center'>
            <p className='text-sm text-slate-500'>최근 등록한 할 일이 없어요</p>
          </div>
        )}
        <div className='absolute bottom-4 h-[51px] w-[calc(100%-48PX)] bg-gradient-to-b from-white/0 to-white/100 pointer-events-none' />
      </div>
    </>
  );
}
