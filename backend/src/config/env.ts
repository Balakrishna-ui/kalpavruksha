import dotenv from 'dotenv';

dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173,http://localhost:5174,http://localhost:4000,https://kalpavruksha.co.in,https://www.kalpavruksha.co.in',
  jwtSecret: process.env.JWT_SECRET || 'kalpavruksha_super_secret_jwt_key_2026',
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587,
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  }
};

export const isProduction = config.env === 'production';

// Fail fast in production if critical secrets are missing or using defaults
if (isProduction) {
  if (!process.env.DATABASE_URL) {
    console.error('CRITICAL ERROR: Missing DATABASE_URL in production.');
    process.exit(1);
  }
  if (!process.env.ENCRYPTION_KEY) {
    console.error('CRITICAL ERROR: Missing ENCRYPTION_KEY in production.');
    process.exit(1);
  }
  if (!process.env.JWT_SECRET || config.jwtSecret === 'kalpavruksha_super_secret_jwt_key_2026') {
    console.error('CRITICAL ERROR: Missing or unsafe JWT_SECRET in production.');
    process.exit(1);
  }
}
