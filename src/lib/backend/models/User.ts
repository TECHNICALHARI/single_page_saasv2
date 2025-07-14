import mongoose, { Schema, Document } from 'mongoose';
import { ROLES } from '../constants/roles';

export interface IUser extends Document {
  email?: string;
  mobile?: string;
  password: string;
  otp?: string;
  role: string;
  subdomain: string;
  isVerified: boolean;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, unique: true, sparse: true },
  mobile: { type: String, unique: true, sparse: true },
  password: { type: String },
  otp: String,
  subdomain: { type: String, unique: true },
  role: { type: String, default: ROLES.USER },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
