import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import { TokenPayload } from '../types/auth.types';
import { AppError } from '../middleware/error.middleware';

export const signToken = (payload: Omit<TokenPayload, 'iat' | 'exp'>, expiresIn: string | number = '12h'): string => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: expiresIn as any });
};

export const verifyToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, config.jwtSecret) as TokenPayload;
  } catch (error) {
    throw new AppError('Invalid or expired token', 401);
  }
};
