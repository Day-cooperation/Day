'use client';

import { deleteRequest, getRequest, patchRequest } from '@/api/api';
import { ArrowRight, Flag, Plus } from '@/assets/svgs';
import { NoteAndPen } from '@/assets/svgs/NoteAndPen';
import MixedInput from '@/components/Input/MixedInput';
import ListTodo from '@/components/ListTodo/ListTodo';
import Modal from '@/components/Modal/Modal';
import Popover from '@/components/Popover/Popover';
import ConfirmPopup from '@/components/Popup/ConfirmPopup';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import { queryKey, useGetQuery } from '@/queries/query';
import { ListTodoButtons, Todo } from '@/types/Todo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import NoteRead from '@/components/Note/NoteRead';
import { useParams, useRouter } from 'next/navigation';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useDisclosure } from '@nextui-org/react';

export default function Goal() {
  const confirmRef = useRef<HTMLDialogElement>(null);
  const noteRef = useRef<HTMLDialogElement>(null);
  const [modalType, setModalType] = useState<'create' | 'edit'>('create');
  const [confirm, setConfirm] = useState({ message: '', setDeleteId: 0 });
  const [todo, setTodo] = useState();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [confirmType, setConfirmType] = useState<'popup' | 'goal'>('popup');
  const queryClient = useQueryClient();
  const [isGoalTitleEdit, setIsGoalTitleEdit] = useState(false);

  const { goalId } = useParams();
  const route = useRouter();
  const [popupOpen, setPopupOpen] = useState<number | null>(null);
  const { data: goalResponse } = useGetQuery.goal(Number(goalId));
  const [goalTitle, setGoalTitle] = useState('');
  const { data: goalTodoResponse } = useGetQuery.todo(Number(goalId));
  const { data: goalProgress, isLoading } = useGetQuery.progress(Number(goalId));

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
      queryClient.invalidateQueries(queryKey.todo(Number(goalId)));
      queryClient.invalidateQueries(queryKey.progress(Number(goalId)));
    },
  });

  const { mutate: deleteTodoMutate } = useMutation({
    mutationFn: (path: number) => deleteRequest({ url: `todos/${path}` }),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey.todo());
      queryClient.invalidateQueries(queryKey.todo(Number(goalId)));
      queryClient.invalidateQueries(queryKey.progress(Number(goalId)));
    },
  });

  const { mutate: deleteGoalMutate } = useMutation({
    mutationFn: (path: number) => deleteRequest({ url: `goals/${path}` }),
    onSuccess: () => {
      route.push('/dashboard');
      return <div>loading...</div>;
    },
  });

  const { mutate: updateGoalMutate } = useMutation({
    mutationFn: (input: string) => patchRequest({ url: `goals/${goalId}`, data: { title: input } }),
    onSuccess: () => queryClient.invalidateQueries(queryKey.goal(Number(goalId))),
  });
  const handleAddTodo = () => {
    setModalType('create');
    onOpen();
  };

  const handleButtonClick = (type: ListTodoButtons, id: number) => {
    const selecteItem = goalTodoResponse?.todos.find((todo: Todo) => todo.id === id);
    if (type === 'done') {
      updateTodoMutate({ path: String(selecteItem.id), data: { ...selecteItem, done: !selecteItem.done } });
    }
    if (type === 'delete') {
      if (!confirmRef.current) return;
      setConfirm({ message: '정말로 삭제하시겠어요?', setDeleteId: id });
      setConfirmType('popup');
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

  const handleKeydownInput = (e: KeyboardEvent<HTMLInputElement> | KeyboardEvent) => {
    if (e.key === 'Escape') {
      setGoalTitle(goalTitle);
      setIsGoalTitleEdit(false);
    }
    if (e.key === 'Enter') {
      setGoalTitle(goalTitle);
      updateGoalMutate(goalTitle);
      setIsGoalTitleEdit(false);
    }
  };

  const handlePopupClick = (type: ListTodoButtons, id: number) => {
    if (type === 'edit') {
      setIsGoalTitleEdit(true);
    }

    if (type === 'delete') {
      if (!confirmRef.current) return;
      setConfirm({ message: '정말로 삭제하시겠어요?', setDeleteId: id });
      setConfirmType('goal');
      confirmRef.current.showModal();
    }
  };

  const handleDeleteConfirmClick = (answer: 'ok' | 'cancel') => {
    if (answer === 'ok') {
      if (confirmType === 'goal') {
        deleteGoalMutate(Number(goalId));
      } else {
        deleteTodoMutate(confirm.setDeleteId);
      }
    }
  };

  const todoList = goalTodoResponse?.todos.filter((todo: Todo) => todo.done === false) || [];
  const doneList = goalTodoResponse?.todos.filter((todo: Todo) => todo.done === true) || [];

  useEffect(() => {
    setGoalTitle(goalResponse?.title);
  }, [goalResponse]);
  return (
    <>
      <ConfirmPopup
        type={confirmType}
        dialogRef={confirmRef}
        confirmText={confirm.message}
        onConfirmClick={handleDeleteConfirmClick}
        confirm
      />
      <NoteRead dialogRef={noteRef} data={noteData} />
      <Modal onClose={onClose} isOpen={isOpen} modalType={modalType} items={todo} />

      <div className='p-4 md:p-6 flex flex-col gap-4 max-w-[1200px]'>
        <h2 className='text-slate-900 text-lg font-semibold '>목표</h2>
        <div className='flex flex-col gap-4 md:gap-6 h-full'>
          <div className=' bg-white border border-slate-100 rounded-xl px-6 py-4 flex flex-col gap-6'>
            <div className='flex max-w-[1200px] justify-between'>
              <div>
                <div className='flex items-center gap-2'>
                  <div className='p-2 bg-black rounded-[15px]'>
                    <Flag fill='white' />
                  </div>
                  {isGoalTitleEdit ? (
                    <MixedInput
                      size='full'
                      name='goal'
                      type='text'
                      value={goalTitle}
                      handleChange={(e) => setGoalTitle(e.target.value)}
                      handleKeyDown={handleKeydownInput}
                    />
                  ) : (
                    <span className='text-slate-800 text-lg font-semibold'>{goalResponse?.title}</span>
                  )}
                </div>
              </div>
              <Popover
                isGoal={true}
                noteId={false}
                item={goalResponse || []}
                handlePopupClick={handlePopupClick}
                openPopupId={popupOpen}
                setOpenPopupId={setPopupOpen}
              />
            </div>
            <div className='flex flex-col gap-2 '>
              <span className='text-slate-900 text-xs font-semibold'>Progress</span>
              <div className='-mx-2'>
                <ProgressBar value={isLoading ? 0 : goalProgress?.progress} />
              </div>
            </div>
          </div>

          <Link href={`/notes/${goalId}`} className='bg-blue-100 rounded-xl flex justify-between px-6 py-4 '>
            <div className='flex gap-[5px] items-center'>
              <NoteAndPen />
              <span className='text-slate-800 font-bold text-lg'>노트 모아보기</span>
            </div>
            <ArrowRight />
          </Link>

          <div className='flex flex-col lg:flex-row gap-6 '>
            <div
              className={`flex flex-col lg:max-w-[588px] ${todoList.length > 4 ? '' : 'h-[238px]'} w-full bg-white px-6 py-4 rounded-xl gap-4`}
            >
              <div className='flex justify-between'>
                <h3 className='text-slate-800 text-lg font-bold'>To do</h3>
                <button className='flex items-center gap-1 text-sm font-semibold text-blue-500' onClick={handleAddTodo}>
                  <Plus strokeColor='currentColor' className='w-4 h-4' />
                  할일 추가
                </button>
              </div>
              {todoList.length ? (
                <ListTodo onButtonClick={handleButtonClick} showGoal={false} todos={todoList} />
              ) : (
                <div className='flex items-center justify-center h-full'>
                  <p className='text-slate-500 text-sm'>해야할 일이 아직 없어요</p>
                </div>
              )}
            </div>
            <div
              className={`flex flex-col gap-4 lg:max-w-[588px] ${doneList.length > 5 ? 'h-full' : 'h-[238px]'} w-full bg-slate-200 px-6 py-4 rounded-xl`}
            >
              <h3 className='text-slate-800 text-lg font-bold'>Done</h3>
              {doneList.length ? (
                <ListTodo onButtonClick={handleButtonClick} showGoal={false} todos={doneList} />
              ) : (
                <div className='flex items-center justify-center h-full'>
                  <p className='text-slate-500 text-sm'>해야할 일이 아직 없어요</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
