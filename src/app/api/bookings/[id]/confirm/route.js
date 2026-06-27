import { NextResponse } from 'next/server';
import { bookingController } from '@/controllers';
import { withAuth, withRole } from '@/middlewares/auth';
import { errorHandler } from '../../../error-handler';

export const PUT = withAuth(withRole(['super_admin', 'admin']), async (req, { params }) => {
  try {
    req.params = params;
    const result = await bookingController.confirm(req);
    return NextResponse.json(result);
  } catch (err) {
    return errorHandler(err);
  }
});
