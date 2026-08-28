import { Router } from 'express';
import { FinancialController } from '../controllers/financial.controller';
import { requireAdmin } from '../middleware/auth.middleware';
import { formLimiter } from '../middleware/rate-limit.middleware';
import { validatePhone } from '../validators/common.validator';

const router = Router();

// Public route for creating an enquiry
router.post('/financial-enquiry', formLimiter, validatePhone('phoneNumber'), FinancialController.create);

// Protected Admin Routes
router.get('/admin/financial-enquiries', requireAdmin, FinancialController.getAll);
router.get('/admin/financial-enquiries/export', requireAdmin, FinancialController.exportData);
router.delete('/admin/financial-enquiries/:id', requireAdmin, FinancialController.delete);

export default router;
