import { z } from 'zod';

export const signupStep1Schema = z.object({
  email: z.string().email().optional(),
  mobile: z.string().min(10).max(15).optional(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  subdomain: z.string().min(3),
}).refine((data) => data.email || data.mobile, {
  message: 'Email or mobile is required',
});

export const signupStep2Schema = z.object({
  email: z.string().email().optional(),
  mobile: z.string().min(10).max(15).optional(),
  otp: z.string().length(6),
}).refine((data) => data.email || data.mobile, {
  message: 'Email or mobile is required',
});

export const loginSchema = z.object({
  email: z.string().email().optional(),
  mobile: z.string().min(10).max(15).optional(),
  password: z.string().min(4).optional(),
  otp: z.string().length(6).optional(),
}).refine((data) => data.email || data.mobile, {
  message: 'Email or mobile is required',
}).refine((data) => data.password || data.otp, {
  message: 'Password or OTP is required',
});
