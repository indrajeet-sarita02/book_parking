import { NextResponse } from 'next/server';
import { paymentController } from '@/controllers';
import { withAuth } from '@/middlewares/auth';
import { errorHandler } from '../error-handler';

export const GET = withAuth(async (req) => {
  try {
    const result = await paymentController.list(req);
    return NextResponse.json(result);
  } catch (err) {
    return errorHandler(err);
  }
});

export const POST = withAuth(async (req) => {
  try {
    const body = await req.json();
    const result = await paymentController.create(req);
    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    return errorHandler(err);
  }
});
