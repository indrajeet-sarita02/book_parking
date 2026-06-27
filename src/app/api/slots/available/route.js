import { NextResponse } from 'next/server';
import { slotController } from '@/controllers';
import { errorHandler } from '../../error-handler';

export const GET = async (req) => {
  try {
    const url = new URL(req.url);
    if (!url.searchParams.has('status')) {
      url.searchParams.set('status', 'available');
      req = new Request(url.toString(), req);
    }
    const result = await slotController.list(req);
    return NextResponse.json(result);
  } catch (err) {
    return errorHandler(err);
  }
};
