import multer from 'multer';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { AppError } from './error.middleware';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '..', '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate secure filename avoiding traversal issues
    const uniqueSuffix = Date.now() + '-' + crypto.randomBytes(8).toString('hex');
    // only preserve the extension securely
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Add MIME type validation here if needed, for now accept common documents/images
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new AppError('Invalid file type. Only JPEG, PNG, WEBP, and PDF are allowed.', 400));
  }
};

export const uploadMiddleware = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB max size
  },
  fileFilter
});

// Block sensitive documents from public static access
export const protectSensitiveFiles = (req: Request, res: Response, next: NextFunction) => {
  const isSensitive = /^(photo|aadhaar|pan|addressProof|signature|document)-/.test(req.path.substring(1));
  if (isSensitive) {
    return next(new AppError('Forbidden: Sensitive documents cannot be accessed directly. Use the secure API.', 403));
  }
  next();
};
