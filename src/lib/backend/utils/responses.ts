import { NextResponse } from 'next/server';

export function successResponse(status: number, message: string, data?: any) {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status }
  );
}

export function errorResponse(status: number, message: string) {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status }
  );
}
