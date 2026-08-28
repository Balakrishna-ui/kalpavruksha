import bcrypt from 'bcryptjs';
import prisma from '../config/database';
import { generateOTP } from '../utils/otp';
import { getMailTransporter } from '../config/mail';
import { AppError } from '../middleware/error.middleware';

// In-memory OTP store (In a real enterprise app, this would be in Redis)
interface OTPStore {
  [email: string]: {
    otp: string;
    expiresAt: Date;
    verified: boolean;
    attempts: number;
    lastRequestedAt: Date;
  }
}
const otpStorage: OTPStore = {};

export class AuthService {
  static async validateAdmin(email: string) {
    const admin = await prisma.adminUser.findUnique({ where: { email } });
    if (!admin) throw new AppError('Invalid email or password', 401);
    if (!admin.isActive) throw new AppError('Account disabled', 403);
    return admin;
  }

  static async updateLastLogin(id: string) {
    await prisma.adminUser.update({
      where: { id },
      data: { lastLoginAt: new Date() }
    });
  }

  static async requestOtp(email: string) {
    const admin = await prisma.adminUser.findUnique({ where: { email } });
    if (!admin) throw new AppError('No admin account found with this email', 404);

    const existing = otpStorage[email];
    if (existing && new Date().getTime() - existing.lastRequestedAt.getTime() < 30000) {
      throw new AppError('Please wait 30 seconds before requesting another OTP.', 429);
    }

    const otp = generateOTP();
    const expiresAt = new Date(new Date().getTime() + 5 * 60 * 1000); // 5 minutes

    otpStorage[email] = {
      otp,
      expiresAt,
      verified: false,
      attempts: 0,
      lastRequestedAt: new Date()
    };

    // OTP is deliberately not logged anywhere to satisfy high-security requirements

    const mailTransporter = getMailTransporter();
    if (mailTransporter && process.env.SMTP_USER) {
      try {
        await mailTransporter.sendMail({
          from: `"Kalpavruksha Admin" <${process.env.SMTP_USER}>`,
          to: email,
          subject: 'Admin Password Reset OTP - Kalpavruksha',
          text: `Your security OTP for resetting your Kalpavruksha Admin password is: ${otp}. It will expire in 5 minutes.`,
          html: `<div style="font-family: sans-serif; padding: 20px; color: #11213F;">
            <h2>Kalpavruksha Admin Portal</h2>
            <p>You requested a password reset. Use the OTP below to complete the verification:</p>
            <h1 style="color: #C9A13B; letter-spacing: 5px; font-size: 32px;">${otp}</h1>
            <p style="color: #666; font-size: 12px;">This OTP will expire in 5 minutes. If you did not request this, please ignore this email.</p>
          </div>`
        });
      } catch (err) {
        console.error('Failed to send OTP email', err);
      }
    }
    
    return otp; // Return for testing/mocking
  }

  static verifyOtp(email: string, otp: string) {
    const record = otpStorage[email];
    if (!record) throw new AppError('No OTP session found. Please request a new OTP.', 400);
    
    if (new Date() > record.expiresAt) {
      delete otpStorage[email];
      throw new AppError('OTP has expired. Please request a new one.', 400);
    }

    if (record.attempts >= 5) {
      delete otpStorage[email];
      throw new AppError('Too many failed verification attempts. Please request a new OTP.', 429);
    }

    record.attempts += 1;

    if (record.otp !== otp) {
      throw new AppError('Invalid OTP. Please try again.', 400);
    }

    record.verified = true;
    return true;
  }

  static async resetPassword(email: string, otp: string, newPassword: string) {
    const record = otpStorage[email];
    if (!record || !record.verified || record.otp !== otp) {
      throw new AppError('Unauthorized reset request or session expired. Verify OTP first.', 400);
    }

    const salt = await bcrypt.genSalt(10);
    const newHash = await bcrypt.hash(newPassword, salt);

    await prisma.adminUser.update({
      where: { email },
      data: { password: newHash }
    });

    delete otpStorage[email];
  }

  static async changePassword(email: string, oldPassword: string, newPassword: string) {
    const admin = await prisma.adminUser.findUnique({ where: { email } });
    if (!admin) throw new AppError('Admin not found', 404);

    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) throw new AppError('Incorrect current password', 400);

    const salt = await bcrypt.genSalt(10);
    const newHash = await bcrypt.hash(newPassword, salt);

    await prisma.adminUser.update({
      where: { email },
      data: { password: newHash }
    });
  }
}
