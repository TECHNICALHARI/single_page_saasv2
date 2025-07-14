// lib/backend/utils/TryCatch.ts
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { errorResponse } from './responses';

/**
 * Handles API errors globally including Zod validation issues.
 */
export const TryCatch = (handler: (req: NextRequest) => Promise<NextResponse>) =>
  async (req: NextRequest): Promise<NextResponse> => {
    try {
      return await handler(req);
    } catch (error: any) {
      if (error instanceof ZodError) {
        const message = error.issues?.[0]?.message || 'Validation failed';
        return errorResponse(422, message);
      }

      console.error('API Error:', error);
      return errorResponse(500, error.message || 'Internal Server Error');
    }
  };
