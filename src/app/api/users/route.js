import { NextResponse } from 'next/server';
import { userController } from '@/controllers';
import { withAuth, withRole } from '@/middlewares/auth';
import { errorHandler } from '../error-handler';

export const GET = withAuth(withRole(['super_admin', 'admin']), async (req) => {
  try {
    const result = await userController.list(req);
    return NextResponse.json(result);
  } catch (err) {
    return errorHandler(err);
  }
});

export const POST = withAuth(withRole(['super_admin']), async (req) => {
  try {
    const body = await req.json();
    req.validatedBody = body;
    const result = await userController.create(req);
    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    return errorHandler(err);
  }
});
