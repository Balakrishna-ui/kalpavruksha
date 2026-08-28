import { Router } from 'express';
import { ContactController } from '../controllers/contact.controller';
import { requireAdmin } from '../middleware/auth.middleware';
import { formLimiter } from '../middleware/rate-limit.middleware';
import { validatePhone, requireFields, validateEmail, inputSanitizer } from '../validators/common.validator';

const router = Router();

// Public route for creating contact request
router.post('/contact', 
  formLimiter, 
  requireFields(['name', 'mobileNumber', 'email', 'subject', 'message']),
  validateEmail('email'),
  validatePhone('mobileNumber'), 
  inputSanitizer({ maxLengths: { name: 100, subject: 150, email: 100, mobileNumber: 15, message: 2000 } }),
  ContactController.create
);

// Protected Admin Routes
router.get('/admin/contact-requests', requireAdmin, ContactController.getAll);
router.delete('/admin/contact-requests/:id', requireAdmin, ContactController.delete);

export default router;
