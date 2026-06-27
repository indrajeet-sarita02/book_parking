import { NextResponse } from 'next/server';
import { slotController } from '@/controllers';
import { withAuth, withRole } from '@/middlewares/auth';
import { errorHandler } from '../../error-handler';

export const GET = withAuth(async (req, { params }) => {
  try {
    req.params = params;
    const result = await slotController.getById(req);
    return NextResponse.json(result);
  } catch (err) {
    return errorHandler(err);
  }
});

export const PUT = withAuth(withRole(['super_admin', 'admin']), async (req, { params }) => {
  try {
    req.params = params;
    const body = await req.json();
    req.validatedBody = body;
    const result = await slotController.update(req);
    return NextResponse.json(result);
  } catch (err) {
    return errorHandler(err);
  }
});

export const DELETE = withAuth(withRole(['super_admin']), async (req, { params }) => {
  try {
    req.params = params;
    const result = await slotController.delete(req);
    return NextResponse.json(result);
  } catch (err) {
    return errorHandler(err);
  }
});
