import { Router } from 'express';
import { ServiceController } from '../controllers/service.controller';
import { requireAdmin } from '../middleware/auth.middleware';
import { formLimiter } from '../middleware/rate-limit.middleware';

const router = Router();

// Public Routes
router.post('/service-request', formLimiter, ServiceController.create);
router.get('/services', ServiceController.getAll);

// Protected Admin Routes
router.get('/services/export', requireAdmin, ServiceController.exportData);
router.patch('/services/:id/status', requireAdmin, ServiceController.updateStatus);

export default router;
