import { signOut } from 'next-auth/react';

export const useSignout = () => {
  localStorage.clear();
  signOut();
};
