import { NextResponse } from 'next/server';
import { bookingController } from '@/controllers';
import { withAuth } from '@/middlewares/auth';
import { errorHandler } from '../../error-handler';

export const GET = withAuth(async (req, { params }) => {
  try {
    req.params = params;
    const result = await bookingController.getById(req);
    return NextResponse.json(result);
  } catch (err) {
    return errorHandler(err);
  }
});
