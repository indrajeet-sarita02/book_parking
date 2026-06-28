import { NextResponse } from 'next/server';
import { authController } from '@/controllers';
import { errorHandler } from '../../error-handler';
import { loginSchema } from '@/lib/validations/auth';
import { ensureDbInit } from '@/lib/db-init';

async function handler(req) {
  try {
    await ensureDbInit();
    const body = await req.json();
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
