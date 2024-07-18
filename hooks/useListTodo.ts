import { deleteRequest, getRequest, patchRequest } from '@/api/api';
import { queryKey, useGetQuery } from '@/queries/query';
import { Goal } from '@/types/Goal';
import { ListTodoButtons, Todo } from '@/types/Todo';
import { fileDownload } from '@/utils/fileDownload';
import { useDisclosure } from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export const useListTodo = (goalId?: number) => {
  const queryClient = useQueryClient();

  const { data: todoResponse, isLoading, error } = useGetQuery.todo(goalId);
  const { data: goalResponse } = useGetQuery.goal(goalId ? goalId : undefined);
  const confirmRef = useRef<HTMLDialogElement>(null);
  const noteRef = useRef<HTMLDialogElement>(null);
  const [modalType, setModalType] = useState<'create' | 'edit'>('create');
  const [confirm, setConfirm] = useState({ message: '', setDeleteId: 0 });
  const [todo, setTodo] = useState();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const router = useRouter();

  // 노트 읽고 띄워주기
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
      if (goalId) {
        queryClient.invalidateQueries(queryKey.todo(goalId));
        queryClient.invalidateQueries(queryKey.progress(goalId));
      } else {
        goalResponse?.goals.forEach((goal: Goal) => {
          queryClient.invalidateQueries(queryKey.todo(goal.id));
          queryClient.invalidateQueries(queryKey.progress(goal.id));
        });
      }
      queryClient.invalidateQueries(queryKey.todo());
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: (id: number) => deleteRequest({ url: `todos/${id}` }),
    onSuccess: () => {
      setConfirm({ message: '', setDeleteId: 0 });
      if (goalId) {
        queryClient.invalidateQueries(queryKey.todo(goalId));
        queryClient.invalidateQueries(queryKey.progress(goalId));
      } else {
        goalResponse?.goals.forEach((goal: Goal) => {
          queryClient.invalidateQueries(queryKey.todo(goal.id));
          queryClient.invalidateQueries(queryKey.progress(goal.id));
        });
      }
      queryClient.invalidateQueries(queryKey.todo());
    },
  });

  const handleListPopupClick = (type: ListTodoButtons, id: number) => {
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
    if (type === 'file') {
      fileDownload(selecteItem);
    }
    if (type === 'link') {
      let link = selecteItem.linkUrl;
      if (typeof window !== 'undefined') {
        if (window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1'))
          if (!selecteItem.linkUrl.startsWith('http')) link = 'http://' + link;

        window.open(link);
      }
    }
    if (type === 'note write') {
      router.push(`/note/${id}/write`);
    }
  };

  const handleDeleteConfirmClick = (answer: 'ok' | 'cancel') => {
    if (answer === 'ok') {
      deleteMutate(confirm.setDeleteId);
    }
  };

  return {
    isLoading,
    confirmRef,
    confirm,
    setConfirm,
    handleDeleteConfirmClick,
    noteRef,
    noteData,
    onClose,
    isOpen,
    modalType,
    todo,
    todoResponse,
    handleListPopupClick,
    onOpen,
    setModalType,
    error,
    queryClient,
  };
};
