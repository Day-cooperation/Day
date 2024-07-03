export type Todos = {
  totalCount: number;
  nextCursor: number;
  todos: Todo[];
};

export type Todo = {
  noteId: number;
  done?: boolean;
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
