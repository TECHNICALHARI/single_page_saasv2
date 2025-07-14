// app/api/verify-otp/route.ts
import { NextRequest } from 'next/server';
import dbConnect from '@/lib/backend/config/db';
import { signupStep2Schema } from '@/lib/backend/zod/auth.schema';
import { TryCatch } from '@/lib/backend/utils/TryCatch';
import { Validate } from '@/lib/backend/utils/Validate';
import { successResponse } from '@/lib/backend/utils/responses';
import { verifyOtpAndCreateAccount } from '@/lib/backend/services/auth.service';

export const POST = TryCatch(async (req: NextRequest) => {
  await dbConnect();
  const body = await req.json();
  const data = await Validate(body, signupStep2Schema);

  const result = await verifyOtpAndCreateAccount(data);
  return successResponse(200, 'Signup successful', result);
});
