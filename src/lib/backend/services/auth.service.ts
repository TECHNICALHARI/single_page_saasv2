import User from '@/lib/backend/models/User';
import { hashPassword, comparePassword } from '@/lib/backend/utils/hash';
import { generateToken } from '@/lib/backend/utils/jwt';

function generateOtp() {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
  return { otp, otpExpires };
}

export async function registerUserWithOtp({
  email,
  mobile,
  password,
  subdomain,
}: {
  email?: string;
  mobile?: string;
  password: string;
  subdomain: string;
}) {
  const existing = await User.findOne({
    $or: [{ email }, { mobile }, { subdomain }],
  });

  if (existing) throw new Error('User already exists');

  const { otp, otpExpires } = generateOtp();

  const newUser = await User.create({
    email,
    mobile,
    password, 
    subdomain,
    otp,
    otpExpires,
    isVerified: false,
    role: 'admin',
  });

  console.log(`🔐 OTP for signup (testing): ${otp}`);

  return { userId: newUser._id };
}

export async function verifyOtpAndCreateAccount({
  email,
  mobile,
  otp,
}: {
  email?: string;
  mobile?: string;
  otp: string;
}) {
  const user = await User.findOne({
    ...(email ? { email } : { mobile }),
  });

  if (!user || !user.otp || !user.otpExpires)
    throw new Error('OTP not found or expired');

  if (user.otp !== otp)
    throw new Error('Invalid OTP');

  if (user.otpExpires < new Date())
    throw new Error('OTP expired');

  user.password = await hashPassword(user.password);
  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  const token = generateToken(user._id.toString(), user.role);

  return {
    message: 'Account verified successfully',
    token,
    user: {
      id: user._id,
      email: user.email,
      mobile: user.mobile,
      subdomain: user.subdomain,
      role: user.role,
    },
  };
}

export async function loginWithPasswordOrOtp({
  email,
  mobile,
  password,
  otp,
}: {
  email?: string;
  mobile?: string;
  password?: string;
  otp?: string;
}) {
  const user = await User.findOne({
    ...(email ? { email } : { mobile }),
  });

  if (!user) throw new Error('User not found');
  if (!user.isVerified) throw new Error('Account not verified');

  if (password) {
    const isValid = await comparePassword(password, user.password);
    if (!isValid) throw new Error('Invalid password');
  } else if (otp) {
    if (user.otp !== otp || user.otpExpires < new Date()) {
      throw new Error('Invalid or expired OTP');
    }

    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
  } else {
    throw new Error('Password or OTP is required');
  }

  const token = generateToken(user._id.toString(), user.role);

  return {
    message: 'Login successful',
    token,
    user: {
      id: user._id,
      email: user.email,
      mobile: user.mobile,
      subdomain: user.subdomain,
      role: user.role,
    },
  };
}
