import { Request, Response, NextFunction } from 'express';
import { AppError } from '../middleware/error.middleware';

export const validatePhone = (fieldName: string = 'phone') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const phone = req.body[fieldName];
    if (phone && !/^\d{10}$/.test(phone)) {
      return next(new AppError('Please enter a valid 10-digit mobile number.', 400));
    }
    next();
  };
};

export const requireFields = (fields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    for (const field of fields) {
      if (!req.body[field]) {
        return next(new AppError(`Missing required field: ${field}`, 400));
      }
    }
    next();
  };
};

export const validateEmail = (fieldName: string = 'email') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const email = req.body[fieldName];
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return next(new AppError('Please enter a valid email address.', 400));
      }
    }
    next();
  };
};

export const inputSanitizer = (options: { maxLengths?: Record<string, number> } = {}) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.body) {
      for (const [key, value] of Object.entries(req.body)) {
        if (typeof value === 'string') {
          // Check max lengths
          const maxLength = options.maxLengths?.[key] || 2000; // default 2000 chars max
          if (value.length > maxLength) {
            return next(new AppError(`Field ${key} exceeds maximum allowed length of ${maxLength}.`, 400));
          }
          // Basic HTML strip for XSS prevention
          if (/<[^>]*>?/gm.test(value)) {
             req.body[key] = value.replace(/<[^>]*>?/gm, '');
          }
        }
      }
    }
    next();
  };
};
