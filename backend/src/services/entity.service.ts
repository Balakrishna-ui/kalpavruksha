import prisma from '../config/database';
import { AppError } from '../middleware/error.middleware';

export class EntityService {
  static async getProducts() {
    return prisma.product.findMany();
  }
  static async getProductBySlug(slug: string) {
    const product = await prisma.product.findUnique({ where: { slug } });
    if (!product) throw new AppError('Product not found', 404);
    return product;
  }

  static async getProjects() {
    return prisma.project.findMany();
  }
  static async getProjectBySlug(slug: string) {
    const project = await prisma.project.findUnique({ where: { slug } });
    if (!project) throw new AppError('Project not found', 404);
    return project;
  }

  static async getOrders() {
    return prisma.order.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  static async getLeadership() {
    return prisma.leadership.findMany({
      orderBy: { order: 'asc' }
    });
  }
}
