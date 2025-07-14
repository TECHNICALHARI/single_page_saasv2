// app/api/superadmin/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { signupSchema } from '@/lib/backend/zod/auth.schema';
import dbConnect from '@/lib/backend/config/db';
import { Validate } from '@/lib/backend/utils/Validate';
import User from '@/lib/backend/models/User';
import { TryCatch } from '@/lib/backend/utils/TryCatch';
import { hashPassword } from '@/lib/backend/utils/hash';
import { successResponse, errorResponse } from '@/lib/backend/utils/responses';
import { ROLES } from '@/lib/backend/constants/roles';

export const POST = TryCatch(async (req: NextRequest) => {
  await dbConnect();

  const body = await req.json();
  const data = await Validate(body, signupSchema);

  const { email, mobile, password, subdomain, otp } = data;

  const exists = await User.findOne({
    $or: [{ email }, { mobile }, { subdomain }],
  });

  if (exists) return errorResponse(400, 'User already exists');

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    email,
    mobile,
    password: hashedPassword,
    subdomain,
    otp,
    role: ROLES.SUPERADMIN,
    isVerified: true,
  });

  return successResponse(201, 'Super Admin created successfully', {
    id: user._id,
    subdomain: user.subdomain,
  });
});
