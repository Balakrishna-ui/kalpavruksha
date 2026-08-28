import { Router } from 'express';
import { BusinessConsultancyController } from '../controllers/business-consultancy.controller';
import { requireAdmin } from '../middleware/auth.middleware';
import { formLimiter } from '../middleware/rate-limit.middleware';

const router = Router();

// Public routes (with rate limiting and validation inside controller)
router.post('/business-consultancy', formLimiter, BusinessConsultancyController.create);

// Protected admin routes
router.get('/admin/business-consultancy-enquiries', requireAdmin, BusinessConsultancyController.getAll);
router.get('/admin/business-consultancy-enquiries/export', requireAdmin, BusinessConsultancyController.exportData);
router.patch('/admin/business-consultancy-enquiries/:id/status', requireAdmin, BusinessConsultancyController.updateStatus);
router.delete('/admin/business-consultancy-enquiries/:id', requireAdmin, BusinessConsultancyController.delete);

export default router;
