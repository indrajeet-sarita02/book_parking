import { NextResponse } from 'next/server';

export function errorHandler(err) {
  console.error('[API Error]', err);

  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'Internal server error';

  return NextResponse.json(
    { success: false, message, errors: err.errors || [] },
    { status: statusCode }
  );
}
