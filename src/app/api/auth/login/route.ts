// app/api/login/route.ts
import { NextRequest } from 'next/server';
import dbConnect from '@/lib/backend/config/db';
import { loginSchema } from '@/lib/backend/zod/auth.schema';
import { TryCatch } from '@/lib/backend/utils/TryCatch';
import { Validate } from '@/lib/backend/utils/Validate';
import { successResponse } from '@/lib/backend/utils/responses';
import { loginWithPasswordOrOtp } from '@/lib/backend/services/auth.service';

export const POST = TryCatch(async (req: NextRequest) => {
  await dbConnect();
  const body = await req.json();
  const data = await Validate(body, loginSchema);

  const result = await loginWithPasswordOrOtp(data);
  return successResponse(200, 'Login successful', result);
});
