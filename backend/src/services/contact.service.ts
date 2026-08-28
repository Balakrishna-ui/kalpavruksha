import prisma from '../config/database';
import { AppError } from '../middleware/error.middleware';

export class ContactService {
  static async createContactRequest(data: any) {
    const subjectFormatted = data.preferredService && !data.subject.includes(data.preferredService)
      ? `${data.subject.trim()} [${data.preferredService.trim()}]`
      : data.subject.trim();

    return prisma.contactRequest.create({
      data: {
        name: data.name.trim(),
        email: data.email.trim(),
        mobileNumber: data.mobileNumber.trim(),
        subject: subjectFormatted,
        message: data.message.trim()
      }
    });
  }

  static async getContactRequests(startDate?: string, endDate?: string) {
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

    return prisma.contactRequest.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
  }

  static async deleteContactRequest(id: string) {
    try {
      await prisma.contactRequest.delete({ where: { id } });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new AppError('Contact request not found', 404);
      }
      throw error;
    }
  }
}
