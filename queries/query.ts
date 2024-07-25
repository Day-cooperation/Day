import { getRequest } from '@/lib/api/api';
import { useQuery } from '@tanstack/react-query';

// query key
export const queryKey = {
  user: { queryKey: ['user'] },
  goal: (goalId?: number) => ({
    queryKey: ['goalList', goalId],
  }),
  todo: (goalId?: number) => ({ queryKey: ['todoList', goalId] }),
  progress: (goalId?: number) => ({ queryKey: ['progress', goalId] }),
  note: (goalId?: number, noteId?: number) => ({ queryKey: ['noteList', goalId, noteId] }),
};

// get query
// ex) useGetQuery.goal(); 전체
// ex) useGetQuery.goal(goalId); 특정 골
export const useGetQuery = {
  user: () =>
    useQuery({
      ...queryKey.user,
      queryFn: () => getRequest({ url: 'user' }),
    }),
  goal: (goalId?: number) =>
    useQuery({
      ...queryKey.goal(goalId),
      queryFn: () => getRequest({ url: `goals${goalId ? '/' + goalId : ''}` }),
    }),
  todo: (goalId?: number) =>
    useQuery({
      ...queryKey.todo(goalId),
      queryFn: () => getRequest({ url: 'todos', params: { goalId } }),
    }),
  progress: (goalId?: number) =>
    useQuery({
      ...queryKey.progress(goalId),
      queryFn: () => getRequest({ url: 'todos/progress', params: { goalId } }),
    }),
  note: (goalId?: number, noteId?: number, hasNote?: boolean) => {
    if (goalId)
      return useQuery({
        ...queryKey.note(goalId),
        queryFn: () => getRequest({ url: `notes`, params: { goalId: Number(goalId) } }),
      });
    else
      return useQuery({
        ...queryKey.note(),
        queryFn: () => getRequest({ url: `notes/${noteId}` }),
        enabled: hasNote,
      });
  },
};
