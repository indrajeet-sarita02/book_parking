import { NextResponse } from 'next/server';
import { withAuth } from '@/middlewares/auth';
import { authController } from '@/controllers';
import { errorHandler } from '../../error-handler';

const handler = withAuth(async (req) => {
  try {
    const result = await authController.me(req);
    return NextResponse.json(result);
  } catch (err) {
    return errorHandler(err);
  }
});

export const GET = handler;
