import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import { signin } from '@/api/auth';

const handler = NextAuth({
  // 로그인 타입
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as any;
        const res = await signin({ email, password });
        // res 성공할 시 세션에 res 저장
        if (res) {
          return res;
        }
        // 실패시 null
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },

  // custom page
  pages: {
    signIn: '/signin',
  },
});

export { handler as GET, handler as POST };
