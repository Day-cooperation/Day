type Todo = {
  done: boolean;
  title: string;
  id: number;
};

type Goal = {
  title: string;
  id: number;
};

export type Note = {
  todo: Todo;
  updatedAt: string;
  createdAt: string;
  title: string;
  id: number;
  goal: Goal;
  userId: number;
  teamId: string;
};

export type GetAllNote = {
  nextCursor: number;
  totalCount: number;
  notes: Note[];
};

export type NoteRead = {
  todo: {
    done: boolean;
    fileUrl: string;
    linkUrl: string;
    title: string;
    id: number;
  };
  linkUrl: string;
  content: string;
  updatedAt: string;
  createdAt: string;
  title: string;
  id: number;
  goal: {
    title: string;
    id: number;
  };
  userId: number;
  teamId: string;
};

export type NoteInputValue = {
  todoId?: number | null;
  title: string;
  content: string;
  linkUrl: string | null;
};
