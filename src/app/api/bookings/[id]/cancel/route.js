import { NextResponse } from 'next/server';
import { bookingController } from '@/controllers';
import { withAuth } from '@/middlewares/auth';
import { errorHandler } from '../../../error-handler';

export const PUT = withAuth(async (req, { params }) => {
  try {
    req.params = params;
    const result = await bookingController.cancel(req);
    return NextResponse.json(result);
  } catch (err) {
    return errorHandler(err);
  }
});
