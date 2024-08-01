import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import { signin } from '@/lib/api/auth';
import { instance } from '@/lib/api/axios';

// 세션 유효기간 30분
function getExpieryTime() {
  const date = new Date();
  date.setMinutes(date.getMinutes() + 30);
  return date.getTime();
}

// accessToken refreshToken으로 token 다시 받아와 반환
async function refreshAccessToken(token: any) {
  try {
    const { data } = await instance.post('/auth/tokens', undefined, {
      headers: { Authorization: `Bearer ${token.refreshToken}` },
    });
    return {
      ...token,
      accessToken: data.accessToken,
      accessTokenExpieryTime: getExpieryTime(),
      refreshToken: data.refreshToken,
    };
  } catch (error) {
    console.error(error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

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
  // 엑세스 토큰 유효성 검사 한 뒤 accesstoken 재갱신
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // 초반에 accesstoken 만료시간 정해줌  뒤에서 만료시간이 지나면 refreshToken
    // getSession, setServerSession, useSession 호출 시 발생
    async jwt({ token, user }) {
      // 로그인 시 실행
      if (user) {
        token.accessTokenExpieryTime = getExpieryTime();
        return { ...token, ...user };
      }
      // 현재보다 이전이라면 refreshToken으로 새 token 받아와서 accessToken및 refreshToken및 만료시간 정해줌
      if (new Date().getTime() > (token.accessTokenExpieryTime as number)) {
        const res = await refreshAccessToken(token);
        return res;
      }

      return { ...token };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },

  // custom page
  pages: {
    signIn: '/signin',
    error: '/not-found',
  },

  session: {
    strategy: 'jwt',
    // 해주고 중간에 새로고침 하게 되면 session 다시 요청하게 됨
    // To Do: 새로고침 해도 session 다시 요청 안하게
    // To Do: session 만료 되기 전에 refreshToken으로 다시 가져오기
    // maxAge: 60 * 30,
  },
});

export { handler as GET, handler as POST };
