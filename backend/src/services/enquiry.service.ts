import prisma from '../config/database';
import { AppError } from '../middleware/error.middleware';

export class EnquiryService {
  static async createEnquiry(data: any) {
    return prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        location: data.location,
        plan: data.plan,
        amount: data.amount,
        contactTime: data.contactTime,
      }
    });
  }

  static async getEnquiries(startDate?: string, endDate?: string) {
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

    return prisma.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
  }

  static async updateStatus(id: string, status: string) {
    try {
      return await prisma.lead.update({
        where: { id },
        data: { status }
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new AppError('Enquiry not found', 404);
      }
      throw error;
    }
  }

  static async deleteEnquiry(id: string) {
    try {
      await prisma.lead.delete({ where: { id } });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new AppError('Enquiry not found', 404);
      }
      throw error;
    }
  }
}
