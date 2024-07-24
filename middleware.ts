import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const AUTH_PAGE = ['/dashboard', '/goals', '/note', '/notes', '/todolist'];

export const middleware = async (req: NextRequest) => {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;
  // 로그인된 사용자가 signin 또는 signup 페이지에 접근하려 할 때 dashboard로 리디렉트
  if (token && (pathname === '/signin' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
  // 로그인되지 않은 사용자가 보호된 페이지에 접근하려 할 때 signin으로 리디렉트
  if (!token && AUTH_PAGE.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return NextResponse.next();
};
