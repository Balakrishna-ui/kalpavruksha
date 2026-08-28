import { Router } from 'express';
import { EntityController } from '../controllers/entity.controller';
import { requireAdmin } from '../middleware/auth.middleware';

const router = Router();

// Products
router.get('/products', EntityController.getProducts);
router.get('/products/:slug', EntityController.getProductBySlug);

// Projects
router.get('/projects', EntityController.getProjects);
router.get('/projects/:slug', EntityController.getProjectBySlug);

// Leadership
router.get('/leadership', EntityController.getLeadership);

// Orders (Admin only)
router.get('/orders', requireAdmin, EntityController.getOrders);

export default router;
