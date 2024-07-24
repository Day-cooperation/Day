import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import { signin } from '@/api/auth';
import { AxiosError } from 'axios';

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    // ...add more providers here
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as any;
        const res = await signin({ email, password });
        if (res) {
          return res;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },

  pages: {
    signIn: '/signin',
    newUser: '/dashboard',
  },
});

export { handler as GET, handler as POST };
