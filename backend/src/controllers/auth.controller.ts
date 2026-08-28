import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { AuthService } from '../services/auth.service';
import { signToken } from '../utils/jwt';
import { config } from '../config/env';
import { AppError } from '../middleware/error.middleware';

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw new AppError('Email and password are required', 400);

      const admin = await AuthService.validateAdmin(email);
      
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) throw new AppError('Invalid email or password', 401);

      await AuthService.updateLastLogin(admin.id);

      const token = signToken({ id: admin.id, email: admin.email, role: admin.role });

      const isProduction = config.env === 'production';
      res.cookie('admin_session', token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        path: '/',
        maxAge: 12 * 60 * 60 * 1000 // 12 hours
      });

      res.json({
        authenticated: true,
        token,
        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          role: admin.role
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async me(req: Request, res: Response, next: NextFunction) {
    try {
      const admin = req.admin;
      res.json({
        authenticated: true,
        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          role: admin.role
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const isProduction = config.env === 'production';
      res.clearCookie('admin_session', {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        path: '/'
      });
      res.json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, oldPassword, newPassword } = req.body;
      
      await AuthService.changePassword(email, oldPassword, newPassword);

      res.json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async requestOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      if (!email) throw new AppError('Email address is required', 400);

      const otp = await AuthService.requestOtp(email);
      const message = config.env === 'production' 
        ? 'OTP has been sent to your registered email.'
        : `OTP has been sent to your registered email. (Testing: ${otp})`;
        
      res.json({ success: true, message });
    } catch (error) {
      next(error);
    }
  }

  static async verifyOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, otp } = req.body;
      if (!email || !otp) throw new AppError('Email and OTP are required', 400);

      AuthService.verifyOtp(email, otp);
      res.json({ success: true, message: 'OTP verified successfully.' });
    } catch (error) {
      next(error);
    }
  }

  static async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, otp, newPassword } = req.body;
      if (!email || !otp || !newPassword) throw new AppError('All fields are required', 400);

      await AuthService.resetPassword(email, otp, newPassword);
      res.json({ success: true, message: 'Password has been updated securely.' });
    } catch (error) {
      next(error);
    }
  }
}
