export type Goal = {
  updatedAt: string;
  createdAt: string;
  title: string;
  id: number;
  userId: number;
  teamId: string;
};

export type GoalsResponse = {
  nextCursor: number;
  totalCount: number;
  goals: Goal[];
};
