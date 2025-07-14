// src/lib/backend/config/env.ts
import { z } from 'zod';

const envSchema = z.object({
  MONGODB_URI: z.string().url({ message: 'Invalid MongoDB URI' }),
  JWT_SECRET: z.string().min(10, 'JWT_SECRET is required and must be secure'),
  JWT_EXPIRES_IN: z.string().default('7d'),
});

const parsed = envSchema.safeParse({
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
});

if (!parsed.success) {
  console.error('❌ Invalid environment variables:\n', parsed.error.format());
  throw new Error('Invalid or missing environment variables.');
}

export const env = parsed.data;
