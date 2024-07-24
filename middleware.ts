export { default } from 'next-auth/middleware';

export const config = { matcher: ['/dashboard', '/goals/:path*', '/note/:path*', '/notes/:path*', '/todolist'] };
