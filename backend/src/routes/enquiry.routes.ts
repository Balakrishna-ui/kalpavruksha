import { Router } from 'express';
import { EnquiryController } from '../controllers/enquiry.controller';
import { requireAdmin } from '../middleware/auth.middleware';
import { formLimiter } from '../middleware/rate-limit.middleware';
import { validatePhone } from '../validators/common.validator';

const router = Router();

// Public routes (with rate limiting and validation)
router.post('/enquiry', formLimiter, validatePhone('phone'), EnquiryController.create);

// Protected admin routes
router.get('/enquiries', requireAdmin, EnquiryController.getAll);
router.get('/enquiries/export', requireAdmin, EnquiryController.exportData);
router.patch('/enquiry/:id/status', requireAdmin, EnquiryController.updateStatus);
router.delete('/enquiry/:id', requireAdmin, EnquiryController.delete);

export default router;
