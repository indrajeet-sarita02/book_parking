import { NextResponse } from 'next/server';
import { userController } from '@/controllers';
import { withAuth, withRole } from '@/middlewares/auth';
import { errorHandler } from '../../error-handler';

export const GET = withAuth(withRole(['super_admin', 'admin']), async (req, { params }) => {
  try {
    req.params = params;
    const result = await userController.getById(req);
    return NextResponse.json(result);
  } catch (err) {
    return errorHandler(err);
  }
});

export const PUT = withAuth(withRole(['super_admin']), async (req, { params }) => {
  try {
    req.params = params;
    const body = await req.json();
    req.validatedBody = body;
    const result = await userController.update(req);
    return NextResponse.json(result);
  } catch (err) {
    return errorHandler(err);
  }
});

export const DELETE = withAuth(withRole(['super_admin']), async (req, { params }) => {
  try {
    req.params = params;
    const result = await userController.delete(req);
    return NextResponse.json(result);
  } catch (err) {
    return errorHandler(err);
  }
});
