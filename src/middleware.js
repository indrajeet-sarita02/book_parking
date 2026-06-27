import { NextResponse } from 'next/server';

const publicPaths = ['/', '/login', '/register', '/api/auth/login', '/api/auth/register', '/api/auth/logout'];
const adminPaths = ['/admin'];

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('token')?.value;

  if (pathname.startsWith('/admin') && !token) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith('/api') && !publicPaths.includes(pathname) && !token) {
    if (!pathname.startsWith('/api/auth/login') && !pathname.startsWith('/api/auth/register')) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|_next/webpack-hmr|favicon.ico|images|icons|fonts).*)'],
};
