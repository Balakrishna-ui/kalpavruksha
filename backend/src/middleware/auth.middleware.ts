import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { AppError } from './error.middleware';
import prisma from '../config/database';

declare global {
  namespace Express {
    interface Request {
      admin?: any; // To be properly typed later with Prisma type
    }
  }
}

export const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.admin_session || (req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : req.headers.authorization);
    if (!token) {
      return next(new AppError('Unauthorized: No session token provided', 401));
    }

    const decoded = verifyToken(token);
    const admin = await prisma.adminUser.findUnique({ where: { id: decoded.id } });

    if (!admin || !admin.isActive) {
      return next(new AppError('Forbidden: Admin account is inactive or not found', 403));
    }

    req.admin = admin;
    next();
  } catch (error) {
    next(new AppError('Unauthorized: Invalid or expired session', 401));
  }
};
