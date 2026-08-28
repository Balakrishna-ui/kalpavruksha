import { Router } from 'express';
import { CooperativeTradingController } from '../controllers/cooperative-trading.controller';
import { requireAdmin } from '../middleware/auth.middleware';
import { formLimiter } from '../middleware/rate-limit.middleware';

const router = Router();

// Public routes (with rate limiting and controller validation)
router.post('/cooperative-trading', formLimiter, CooperativeTradingController.create);

// Protected admin routes
router.get('/admin/cooperative-trading-enquiries', requireAdmin, CooperativeTradingController.getAll);
router.get('/admin/cooperative-trading-enquiries/export', requireAdmin, CooperativeTradingController.exportData);
router.patch('/admin/cooperative-trading-enquiries/:id/status', requireAdmin, CooperativeTradingController.updateStatus);
router.delete('/admin/cooperative-trading-enquiries/:id', requireAdmin, CooperativeTradingController.delete);

export default router;
