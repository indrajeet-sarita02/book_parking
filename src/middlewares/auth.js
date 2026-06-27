import { NextResponse } from 'next/server';
import { verifyToken } from '@/config/auth';

export function withAuth(middlewareOrHandler, handler) {
  const actualHandler = handler || middlewareOrHandler;
  const middleware = handler ? middlewareOrHandler : null;

  return async (req, ...args) => {
    try {
      const token = req.cookies.get('token')?.value;
      if (!token) {
        return NextResponse.json(
          { success: false, message: 'Unauthorized' },
          { status: 401 }
        );
      }
      const payload = verifyToken(token);
      req.user = payload;
      if (middleware) {
        return middleware((r) => actualHandler(r, ...args))(req);
      }
      return actualHandler(req, ...args);
    } catch (err) {
      if (err.message?.includes('jwt') || err.message?.includes('token')) {
        return NextResponse.json(
          { success: false, message: 'Invalid or expired token' },
          { status: 401 }
        );
      }
      throw err;
    }
  };
}

export function withRole(roles) {
  return (handler) => async (req, ...args) => {
    if (!roles.includes(req.user.role)) {
      return NextResponse.json(
        { success: false, message: 'Forbidden' },
        { status: 403 }
      );
    }
    return handler(req, ...args);
  };
}
