import { NextResponse } from 'next/server';
import { bookingController } from '@/controllers';
import { withAuth, withRole } from '@/middlewares/auth';
import { errorHandler } from '../error-handler';

export const GET = withAuth(async (req) => {
  try {
    const isCustomer = req.user.role === 'customer';
    if (isCustomer) {
      const result = await bookingController.myBookings(req);
      return NextResponse.json(result);
    }
    const result = await bookingController.list(req);
    return NextResponse.json(result);
  } catch (err) {
    return errorHandler(err);
  }
});

export const POST = withAuth(async (req) => {
  try {
    const body = await req.json();
    req.validatedBody = body;
    const result = await bookingController.create(req);
    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    return errorHandler(err);
  }
});
