export { default } from 'next-auth/middleware';

export const config = { matcher: ['/dashboard', '/goals', '/note/:path*', '/notes/:path*', '/todolist'] };
