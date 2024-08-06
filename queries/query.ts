import { getRequest } from '@/lib/api/api';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

// query key
export const queryKey = {
  user: { queryKey: ['user'] },
  goal: (goalId?: number) => ({
    queryKey: ['goalList', goalId],
  }),
  todoAll: { queryKey: ['todoList'] },
  todo: (goalId?: number, category?: 'All' | 'To do' | 'Done') => ({ queryKey: ['todoList', goalId, category] }),
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
  todo: (goalId?: number, done?: boolean, category?: 'All' | 'To do' | 'Done') =>
    useInfiniteQuery({
      ...queryKey.todo(goalId, category),
      queryFn: ({ pageParam = null }) => getRequest({ url: 'todos', params: { goalId, cursor: pageParam, done } }),
      getNextPageParam: (lastPage) => {
        if (lastPage.totalCount === 20) {
          return null;
        }
        return lastPage.nextCursor || null;
      },
      initialPageParam: null,
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
