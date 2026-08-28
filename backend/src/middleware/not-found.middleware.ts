import { Request, Response, NextFunction } from 'express';
import { AppError } from './error.middleware';

export const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
};
