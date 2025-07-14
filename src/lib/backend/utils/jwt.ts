import jwt from 'jsonwebtoken';
import { env } from '../config/env';

const SECRET = env.JWT_SECRET || 'supersecret';

export const generateToken = (userId: string, role: string) =>
  jwt.sign({ userId, role }, SECRET, { expiresIn: '7d' });

export const verifyToken = (token: string) => jwt.verify(token, SECRET);
