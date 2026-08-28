import prisma from '../config/database';
import { AppError } from '../middleware/error.middleware';

export class FinancialService {
  static async createEnquiry(data: any) {
    return prisma.financialSchemeEnquiry.create({
      data: {
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        city: data.city,
        investmentAmount: data.investmentAmount,
        selectedScheme: data.selectedScheme,
        message: data.message
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

    return prisma.financialSchemeEnquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
  }

  static async deleteEnquiry(id: string) {
    try {
      await prisma.financialSchemeEnquiry.delete({ where: { id } });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new AppError('Enquiry not found', 404);
      }
      throw error;
    }
  }
}
