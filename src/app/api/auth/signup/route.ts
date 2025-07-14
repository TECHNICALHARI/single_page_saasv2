// app/api/signup/route.ts
import { NextRequest } from 'next/server';
import dbConnect from '@/lib/backend/config/db';
import { signupStep1Schema } from '@/lib/backend/zod/auth.schema';
import { TryCatch } from '@/lib/backend/utils/TryCatch';
import { Validate } from '@/lib/backend/utils/Validate';
import { successResponse } from '@/lib/backend/utils/responses';
import { registerUserWithOtp } from '@/lib/backend/services/auth.service';

export const POST = TryCatch(async (req: NextRequest) => {
  await dbConnect();
  const body = await req.json();
  const data = await Validate(body, signupStep1Schema);

  const result = await registerUserWithOtp(data);
  return successResponse(200, 'OTP sent for verification', result);
});
