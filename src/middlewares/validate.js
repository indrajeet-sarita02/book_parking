import { NextResponse } from 'next/server';

export function validate(schema) {
  return (handler) => async (req) => {
    try {
      const body = await req.json();
      const parsed = schema.parse(body);
      req.validatedBody = parsed;
      return handler(req);
    } catch (err) {
      const errors = err.errors?.map(e => ({
        field: e.path.join('.'),
        message: e.message,
      })) || [];
      return NextResponse.json(
        { success: false, message: 'Validation failed', errors },
        { status: 400 }
      );
    }
  };
}
