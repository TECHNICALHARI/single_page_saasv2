// Example usage in dbConnect.ts
import mongoose from 'mongoose';
import { env } from './env';

export default async function dbConnect() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(env.MONGODB_URI);
}
