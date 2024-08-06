import { deleteRequest, getRequest, patchRequest } from '@/lib/api/api';
import { queryKey, useGetQuery } from '@/queries/query';
import { Goal } from '@/types/Goal';
import { ListTodoButtons, PrevTodos, Todo } from '@/types/Todo';
import { fileDownload } from '@/utils/fileDownload';
import { useDisclosure } from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export const useListTodo = (goalId?: number, category: 'All' | 'To do' | 'Done' = 'All') => {
  const queryClient = useQueryClient();

  const {
    data: todoResponse,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetQuery.todo(goalId, category === 'All' ? undefined : category === 'To do' ? false : true, category);

  const { data: goalResponse } = useGetQuery.goal(goalId ? goalId : undefined);
  const confirmRef = useRef<HTMLDialogElement>(null);
  const noteRef = useRef<HTMLDialogElement>(null);
  const [confirm, setConfirm] = useState({ message: '', setDeleteId: 0, type: '' });
  const [modalType, setModalType] = useState<'create' | 'edit'>('create');
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
    onMutate: (value) => {
      if (goalId) {
        queryClient.cancelQueries(queryKey.todo(goalId, category));
        queryClient.setQueryData(queryKey.todo(goalId, category).queryKey, (prevItem: PrevTodos | undefined) => {
          return {
            ...prevItem,
            pages: prevItem?.pages.map((page) => ({
              ...page,
              nextCursor: page.nextCursor,
              todos: page.todos.map((item) => (item.id === value.data.id ? { ...item, done: !item.done } : item)),
            })),
          };
        });
      } else {
        if (!value.path) {
          goalResponse.goals.forEach((goal: Goal) => {
            queryClient.cancelQueries(queryKey.todo(goal.id, category));
            queryClient.setQueryData(queryKey.todo(goal.id, category).queryKey, (prevItem: PrevTodos | undefined) => {
              return {
                ...prevItem,
                pages: prevItem?.pages.map((page) => ({
                  ...page,
                  nextCursor: page.nextCursor,
                  todos: page.todos.map((item) => (item.id === value.data.id ? { ...item, done: !item.done } : item)),
                })),
              };
            });
          });
        }
      }

      queryClient.cancelQueries(queryKey.todo(undefined, category));
      const prevQuery = queryClient.getQueryData<Todo[]>(queryKey.todo(undefined, category).queryKey);

      queryClient.setQueryData(queryKey.todo(undefined, category).queryKey, (prevItem: PrevTodos) => {
        return {
          ...prevItem,
          pages: prevItem.pages.map((page) => ({
            ...page,
            nextCursor: page.nextCursor,
            todos: page.todos.map((item) => (item.id === value.data.id ? { ...item, done: !item.done } : item)),
          })),
        };
      });

      return { prevQuery };
    },
    onError: (err, value, context) => {
      if (context?.prevQuery) {
        queryClient.setQueryData(goalId ? queryKey.todo(goalId).queryKey : queryKey.todo().queryKey, context.prevQuery);
      }
    },
    onSettled: () => {
      if (goalId) {
        queryClient.invalidateQueries(queryKey.todo(goalId, category));
        queryClient.invalidateQueries(queryKey.progress(goalId));
        return;
      } else {
        goalResponse?.goals.forEach((goal: Goal) => {
          queryClient.invalidateQueries(queryKey.todo(goal.id, category));
          queryClient.invalidateQueries(queryKey.progress(goal.id));
          return;
        });
      }
      queryClient.invalidateQueries(queryKey.todoAll);
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: (id: number) => deleteRequest({ url: `todos/${id}` }),
    onSuccess: () => {
      setConfirm({ message: '', setDeleteId: 0, type: '' });
      if (goalId) {
        queryClient.invalidateQueries(queryKey.todo(goalId, category));
        queryClient.invalidateQueries(queryKey.progress(goalId));
      } else {
        goalResponse?.goals.forEach((goal: Goal) => {
          queryClient.invalidateQueries(queryKey.todo(goal.id, category));
          queryClient.invalidateQueries(queryKey.progress(goal.id));
        });
      }
      queryClient.invalidateQueries(queryKey.todo(undefined, category));
    },
  });

  const { mutate: noteDeleteMutate } = useMutation({
    mutationFn: (id: number) => deleteRequest({ url: `notes/${id}` }),
    onSuccess: () => {
      setConfirm({ message: '', setDeleteId: 0, type: '' });
      queryClient.invalidateQueries(queryKey.todo(undefined, category));
      if (goalId) {
        queryClient.invalidateQueries(queryKey.todo(goalId, category));
        queryClient.invalidateQueries(queryKey.note(goalId));
      } else {
        goalResponse?.goals.forEach((goal: Goal) => {
          queryClient.invalidateQueries(queryKey.todo(goal.id));
        });
      }
    },
  });

  const handleListPopupClick = (type: ListTodoButtons, id: number) => {
    const selecteItem = todoResponse?.pages.flatMap((page) => page.todos).find((todo: Todo) => todo.id === id);
    if (type === 'done') {
      updateTodoMutate({ path: String(selecteItem.id), data: { ...selecteItem, done: !selecteItem.done } });
    }
    if (type === 'delete') {
      if (!confirmRef.current) return;
      setConfirm({ message: '정말로 삭제하시겠어요?', setDeleteId: id, type: 'todo' });
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
        if (!selecteItem.linkUrl.startsWith('http')) link = 'https://' + link;

        window.open(link);
      }
    }
    if (type === 'note write') {
      router.push(`/note/write/${id}`);
    }
    if (type === 'note delete') {
      if (!confirmRef.current) return;
      setConfirm({ message: '정말로 노트를 삭제하시겠어요?', setDeleteId: id, type: 'note' });
      confirmRef.current.showModal();
    }
  };

  const handleDeleteConfirmClick = (answer: 'ok' | 'cancel', type: string) => {
    if (answer === 'cancel') return;
    if (type === 'todo') {
      deleteMutate(confirm.setDeleteId);
      return;
    }

    noteDeleteMutate(confirm.setDeleteId);
  };

  return {
    isLoading,
    isFetchingNextPage,
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
    hasNextPage,
    fetchNextPage,
  };
};
