export type Todos = {
  totalCount: number;
  nextCursor: number;
  todos: Todo[];
};

export type Todo = {
  noteId: number | null;
  done: boolean;
  linkUrl?: string;
  fileUrl?: string;
  title: string;
  id: number;
  goal?: Goal;
  userId: number;
  teamId: string;
  updatedAt: string;
  createdAt: string;
};

export type Goal = {
  id: number;
  title: string;
};

export type ListTodoButtons =
  | 'file'
  | 'link'
  | 'note write'
  | 'done'
  | 'note'
  | 'edit'
  | 'delete'
  | 'note read'
  | 'note delete';

export type NewTodo = Pick<Todo, 'title' | 'linkUrl' | 'fileUrl' | 'done'> & {
  goalId?: number;
};
