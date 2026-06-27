import { NextResponse } from 'next/server';
import { locationController } from '@/controllers';
import { withAuth, withRole } from '@/middlewares/auth';
import { errorHandler } from '../error-handler';

export const GET = withAuth(async (req) => {
  try {
    const result = await locationController.list(req);
    return NextResponse.json(result);
  } catch (err) {
    return errorHandler(err);
  }
});

export const POST = withAuth(withRole(['super_admin', 'admin']), async (req) => {
  try {
    const body = await req.json();
    req.validatedBody = body;
    const result = await locationController.create(req);
    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    return errorHandler(err);
  }
});
