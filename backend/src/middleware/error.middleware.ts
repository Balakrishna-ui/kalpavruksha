import { Request, Response, NextFunction } from 'express';
import { config } from '../config/env';

// Standardized Application Error
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorMiddleware = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else {
    // Log unexpected errors securely (only to server logs, not to client)
    console.error(`[UNEXPECTED ERROR] ${err.name}: ${err.message}\n${err.stack}`);
    
    if (!config.env || config.env !== 'production') {
      message = err.message;
    } else {
      // In production, generic message for unknown errors
      message = 'Something went wrong. Please try again later.';
    }
  }

  res.status(statusCode).json({
    error: message,
    ...(config.env !== 'production' && { stack: err.stack }), // Send stack trace only in dev
  });
};
