import prisma from '../config/database';
import { AppError } from '../middleware/error.middleware';

export class ServiceRequestService {
  static async createServiceRequest(data: any) {
    return prisma.serviceRequest.create({
      data: {
        fullName: data.fullName,
        mobile: data.mobile,
        email: data.email,
        serviceCategory: data.serviceCategory,
        selectedService: data.selectedService,
        notes: data.notes
      }
    });
  }

  static async getServiceRequests(startDate?: string, endDate?: string, category?: string) {
    const where: any = {};
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(String(startDate));
      if (endDate) {
        const end = new Date(String(endDate));
        end.setHours(23, 59, 59, 999);
        where.createdAt.lte = end;
      }
    }

    if (category && category !== 'All') {
      where.serviceCategory = String(category);
    }

    return prisma.serviceRequest.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
  }

  static async updateStatus(id: string, status: string) {
    try {
      return await prisma.serviceRequest.update({
        where: { id },
        data: { status }
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new AppError('Service request not found', 404);
      }
      throw error;
    }
  }
}
