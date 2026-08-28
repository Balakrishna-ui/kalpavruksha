import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { requireAdmin } from '../middleware/auth.middleware';
import { authLimiter } from '../middleware/rate-limit.middleware';

const router = Router();

// Public auth endpoints
router.post('/admin/auth/login', authLimiter, AuthController.login);
router.post('/admin/auth/forgot-password/request-otp', authLimiter, AuthController.requestOtp);
router.post('/admin/auth/forgot-password/verify-otp', authLimiter, AuthController.verifyOtp);
router.post('/admin/auth/forgot-password/reset', authLimiter, AuthController.resetPassword);

// Protected auth endpoints
router.get('/admin/auth/me', requireAdmin, AuthController.me);
router.post('/admin/auth/logout', AuthController.logout); // logout should not require requireAdmin
router.post('/admin/auth/change-password', requireAdmin, AuthController.changePassword);

export default router;
