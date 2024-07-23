import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      accessToken: string;
      refreshToken: string;
      user: {
        id: number;
        email: string;
        name: string;
        createdAt: string;
        updatedAt: string;
      };
    };
  }
}
