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
