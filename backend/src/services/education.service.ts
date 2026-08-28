import prisma from '../config/database';
import { AppError } from '../middleware/error.middleware';

export class EducationService {
  static async createEnquiry(data: any) {
    return prisma.educationEnquiry.create({
      data: {
        fullName: data.fullName,
        mobileNumber: data.mobileNumber,
        email: data.email,
        qualification: data.qualification,
        course: data.course,
        preferredMode: data.preferredMode
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

    return prisma.educationEnquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
  }

  static async deleteEnquiry(id: string) {
    try {
      await prisma.educationEnquiry.delete({ where: { id } });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new AppError('Education enquiry not found', 404);
      }
      throw error;
    }
  }
}
