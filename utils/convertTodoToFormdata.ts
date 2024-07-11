import { Todo, NewTodo } from '@/types/Todo';

export const convertTodoToFormdata = (todo?: Todo): NewTodo => {
  if (!todo) return { title: '', fileUrl: '', linkUrl: '', goalId: 0, done: false };
  return {
    title: todo.title,
    fileUrl: todo.fileUrl || '',
    linkUrl: todo.linkUrl || '',
    goalId: todo.goal?.id || 0,
    done: todo.done,
  };
};
