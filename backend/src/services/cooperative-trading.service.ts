import prisma from '../config/database';
import { AppError } from '../middleware/error.middleware';

export class CooperativeTradingService {
  static async createEnquiry(data: {
    fullName: string;
    businessName: string;
    mobileNumber: string;
    email: string;
    category: string;
    memberId?: string;
    message?: string;
  }) {
    return prisma.cooperativeTradingEnquiry.create({
      data: {
        fullName: data.fullName.trim(),
        businessName: data.businessName.trim(),
        mobileNumber: data.mobileNumber.trim(),
        email: data.email.trim(),
        category: data.category.trim(),
        memberId: data.memberId ? data.memberId.trim() : null,
        message: data.message ? data.message.trim() : null,
        status: 'New'
      }
    });
  }

  static async getEnquiries(startDate?: string, endDate?: string, status?: string) {
    const where: any = {};

    if (status && status !== 'All') {
      where.status = status;
    }

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(String(startDate));
      if (endDate) {
        const end = new Date(String(endDate));
        end.setHours(23, 59, 59, 999);
        where.createdAt.lte = end;
      }
    }

    return prisma.cooperativeTradingEnquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
  }

  static async updateStatus(id: string, status: string) {
    const validStatuses = ['New', 'Contacted', 'In Progress', 'Closed'];
    if (!validStatuses.includes(status)) {
      throw new AppError('Invalid status value.', 400);
    }

    try {
      return await prisma.cooperativeTradingEnquiry.update({
        where: { id },
        data: { status }
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new AppError('Enquiry record not found.', 404);
      }
      throw error;
    }
  }

  static async deleteEnquiry(id: string) {
    try {
      await prisma.cooperativeTradingEnquiry.delete({
        where: { id }
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new AppError('Enquiry record not found.', 404);
      }
      throw error;
    }
  }
}
