import { Router } from 'express';
import { EducationController } from '../controllers/education.controller';
import { requireAdmin } from '../middleware/auth.middleware';
import { formLimiter } from '../middleware/rate-limit.middleware';
import { validatePhone, requireFields, validateEmail, inputSanitizer } from '../validators/common.validator';

const router = Router();

// Public route for creating an education enquiry
router.post('/education-enquiry', 
  formLimiter, 
  requireFields(['fullName', 'mobileNumber', 'email', 'qualification', 'course', 'preferredMode']),
  validateEmail('email'),
  validatePhone('mobileNumber'), 
  inputSanitizer({ 
    maxLengths: { 
      fullName: 100, 
      mobileNumber: 15, 
      email: 100, 
      qualification: 100, 
      course: 100, 
      preferredMode: 50 
    } 
  }),
  EducationController.create
);

// Protected Admin Routes
router.get('/admin/education-enquiries', requireAdmin, EducationController.getAll);
router.delete('/admin/education-enquiries/:id', requireAdmin, EducationController.delete);

export default router;
