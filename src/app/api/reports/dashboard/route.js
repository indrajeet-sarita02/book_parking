import { NextResponse } from 'next/server';
import { reportController } from '@/controllers';
import { withAuth, withRole } from '@/middlewares/auth';
import { errorHandler } from '../../error-handler';

export const GET = withAuth(withRole(['super_admin', 'admin']), async (req) => {
  try {
    const result = await reportController.dashboard(req);
    return NextResponse.json(result);
  } catch (err) {
    return errorHandler(err);
  }
});
