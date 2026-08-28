import { Router } from 'express';
import { MembershipController } from '../controllers/membership.controller';
import { requireAdmin } from '../middleware/auth.middleware';
import { uploadMiddleware } from '../middleware/upload.middleware';
import { formLimiter } from '../middleware/rate-limit.middleware';

const router = Router();

// Configure multer fields for membership upload
const membershipUpload = uploadMiddleware.fields([
  { name: 'applicantPhoto', maxCount: 1 },
  { name: 'aadhaarProof', maxCount: 1 },
  { name: 'panProof', maxCount: 1 },
  { name: 'addressProof', maxCount: 1 },
  { name: 'signature', maxCount: 1 }
]);

// Public route (with upload and form limiting)
router.post('/membership', formLimiter, membershipUpload, MembershipController.create);

// Protected Admin Routes
router.get('/members', requireAdmin, MembershipController.getAll);
router.get('/members/export', requireAdmin, MembershipController.exportData);
router.get('/admin/members/:id', requireAdmin, MembershipController.getById);
router.get('/admin/members/:memberId/documents/:documentId', requireAdmin, MembershipController.getDocument);
router.patch('/admin/members/:id/status', requireAdmin, MembershipController.updateStatus);
router.delete('/members/:id', requireAdmin, MembershipController.delete);

export default router;
