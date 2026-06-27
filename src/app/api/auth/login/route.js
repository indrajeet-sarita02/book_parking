import { NextResponse } from 'next/server';
import { authController } from '@/controllers';
import { errorHandler } from '../../error-handler';

async function handler(req) {
  try {
    const body = await req.json();
    const { loginSchema } = require('@/lib/validations/auth');
    const parsed = loginSchema.parse(body);
    req.validatedBody = parsed;
    const result = await authController.login(req);

    const response = NextResponse.json(
      { success: true, data: result.data, message: result.message }
    );

    response.cookies.set('token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (err) {
    return errorHandler(err);
  }
}

export const POST = handler;
