export type User = {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export interface UserResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
}
