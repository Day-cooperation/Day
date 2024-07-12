'use client';

import { deleteRequest, getRequest, patchRequest } from '@/api/api';
import { Plus } from '@/assets/svgs';
import Filter from '@/components/Filter/Filter';
import ListTodo from '@/components/ListTodo/ListTodo';
import Modal from '@/components/Modal/Modal';
import NoteRead from '@/components/Note/NoteRead';
import ConfirmPopup from '@/components/Popup/ConfirmPopup';
import { ListTodoButtons, Todo } from '@/types/Todo';
import { useDisclosure } from '@nextui-org/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function TodoList() {
  const queryClient = useQueryClient();
  const [todoState, setTodoState] = useState('All');
  const [modalType, setModalType] = useState<'create' | 'edit'>('create');
  const [todo, setTodo] = useState<Todo>();
  const [confirm, setConfirm] = useState({ message: '', setDeleteId: 0 });
  const confirmRef = useRef<HTMLDialogElement>(null);
  const noteRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const { data: todoList, isLoading } = useQuery({
    queryKey: ['getTodos'],
    queryFn: () => getRequest({ url: 'todos' }),
  });
  const { data: goalList } = useQuery({
    queryKey: ['goalList'],
    queryFn: () => getRequest({ url: 'goals' }),
  });
  const {
    data: noteData,
    mutate: noteMutate,
    isPending,
  } = useMutation({
    mutationKey: ['getNote'],
    mutationFn: (id) => getRequest({ url: `notes/${id}` }),
    onSuccess: () => {
      if (!noteRef.current) return;
      noteRef.current.showModal();
    },
  });

  const mutation = useMutation({
    mutationFn: ({ id, done }: { id: number; done: boolean }) =>
      patchRequest({ url: `todos/${id}`, data: { done: done } }),
    mutationKey: ['patchDone'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getTodos'] });
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationKey: ['deleteTodo'],
    mutationFn: (id: number) => deleteRequest({ url: `todos/${id}` }),
    onSuccess: () => {
      setConfirm({ message: '', setDeleteId: 0 });
      queryClient.invalidateQueries({ queryKey: ['getTodos'] });
    },
  });

  const { isOpen, onClose, onOpen } = useDisclosure();
  const todos =
    todoState === 'All'
      ? todoList?.data.todos
      : todoList?.data.todos.filter((item: Todo) => item.done === (todoState === 'To do' ? false : true));
  const pageTitle = `${todoState === 'All' ? '모든 할 일' : todoState === 'To do' ? '할 일' : '완료한 일'}(${todos?.length || 0})`;

  const handleTodoTypeClick = (buttonType: ListTodoButtons, id: number) => {
    if (buttonType === 'done') {
      const todo = todos.find((item: Todo) => id === item.id);
      mutation.mutate({ id, done: !todo.done });
      return;
    }
    if (buttonType === 'edit' || buttonType === 'file' || buttonType === 'link') {
      setModalType('edit');
      setTodo(todos.find((item: Todo) => id === item.id));
      onOpen();
    }

    if (buttonType === 'delete') {
      if (!confirmRef.current) return;
      setConfirm({ message: '정말로 삭제하시겠어요?', setDeleteId: id });
      confirmRef.current.showModal();
    }
    if (buttonType === 'note write') {
      router.push('note');
    }

    if (buttonType === 'note read') {
      const noteId = todos.find((item: Todo) => item.id === id).noteId;
      noteMutate(noteId);
    }
  };

  const handleDeleteConfirmClick = (answer: 'ok' | 'cancel') => {
    if (answer === 'ok') {
      deleteMutate(confirm.setDeleteId);
    }
  };
  const handleFilterClick = (category: 'All' | 'To do' | 'Done') => {
    setTodoState(category);
  };

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <ConfirmPopup
        type='popup'
        dialogRef={confirmRef}
        confirmText={confirm.message}
        onConfirmClick={handleDeleteConfirmClick}
        confirm
      />
      <NoteRead dialogRef={noteRef} data={noteData?.data} />
      <Modal modalType={modalType} isOpen={isOpen} items={todo} onClose={onClose} goalList={goalList?.data.goals} />
      <div className='w-full p-4 md:p-6 bg-slate-100 h-full'>
        <div className='w-full max-w-[792px] flex flex-col gap-4 h-full'>
          <div className='flex justify-between'>
            <h1 className='text-lg font-semibold text-slate-900'>{pageTitle}</h1>
            <button
              className='flex gap-1 items-center justify-center text-sm font-semibold text-blue-500'
              onClick={() => {
                onOpen();
                setModalType('create');
              }}
            >
              <Plus strokeColor='currentColor' className='w-6 h-6' />
              할일 추가
            </button>
          </div>

          <div className='flex flex-col gap-4 bg-white w-full h-[calc(100vh-124px)] md:h-full p-6 rounded-xl'>
            <Filter handleClick={handleFilterClick} />
            <ListTodo todos={todos} showGoal={true} onButtonClick={handleTodoTypeClick} />
          </div>
        </div>
      </div>
    </>
  );
}
