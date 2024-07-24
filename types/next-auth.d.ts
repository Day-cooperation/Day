import NextAuth from 'next-auth';
import { UserResponse } from './User';

declare module 'next-auth' {
  interface Session {
    user: UserResponse;
  }
}
