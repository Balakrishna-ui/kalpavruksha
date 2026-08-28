import prisma from '../config/database';
import { AppError } from '../middleware/error.middleware';

export class BusinessConsultancyService {
  static async createEnquiry(data: any) {
    return prisma.businessConsultancyEnquiry.create({
      data: {
        businessName: data.businessName,
        contactPerson: data.contactPerson,
        mobile: data.mobile,
        email: data.email,
        industry: data.industry,
        serviceRequired: data.serviceRequired,
        businessDescription: data.businessDescription
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

    return prisma.businessConsultancyEnquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
  }

  static async updateStatus(id: string, status: string) {
    try {
      return await prisma.businessConsultancyEnquiry.update({
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
      return await prisma.businessConsultancyEnquiry.delete({
        where: { id }
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new AppError('Enquiry not found', 404);
      }
      throw error;
    }
  }
}
