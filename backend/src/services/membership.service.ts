import prisma from '../config/database';
import { AppError } from '../middleware/error.middleware';
import { encrypt, decrypt } from '../utils/crypto';

export class MembershipService {
  static async createMembership(data: any, files: any) {
    const prismaData: any = {};
    const allowedKeys = [
      'fullName', 'fatherName', 'dob', 'age', 'gender', 'occupation', 'annualIncome', 'category', 'mobileNumber', 
      'whatsappNumber', 'email', 'alternateMobile',
      'houseNo', 'street', 'village', 'mandal', 'district', 'state', 'pinCode', 'address', 'location',
      'aadhaarNumber', 'panNumber', 'form60', 'bankName', 'accountHolder', 'accountNumber', 'ifscCode', 'bankBranch',
      'membershipType', 'membershipFee', 'shareCapital', 'totalAmount', 'paymentStatus', 'paymentMethod', 
      'transactionId', 'paymentDate',
      'nomineeName', 'nomineeRelationship', 'nomineeDob', 'nomineeMobile', 'nomineeAadhaar', 'nomineeAddress', 
      'nomineeShare',
      'introducerName', 'introducerMemberId', 'introducerMobile',
      'declarationAccepted', 'phone', 'memberId'
    ];

    for (const key of allowedKeys) {
      if (data[key] !== undefined) {
        prismaData[key] = data[key];
      }
    }

    if (prismaData.form60) prismaData.form60 = prismaData.form60 === 'true';
    if (prismaData.declarationAccepted) prismaData.declarationAccepted = prismaData.declarationAccepted === 'true';
    if (prismaData.membershipFee) prismaData.membershipFee = String(prismaData.membershipFee);
    if (prismaData.shareCapital) prismaData.shareCapital = String(prismaData.shareCapital);
    if (prismaData.totalAmount) prismaData.totalAmount = String(prismaData.totalAmount);

    if (prismaData.aadhaarNumber) prismaData.aadhaarNumber = encrypt(prismaData.aadhaarNumber);
    if (prismaData.panNumber) prismaData.panNumber = encrypt(prismaData.panNumber);
    if (prismaData.accountNumber) prismaData.accountNumber = encrypt(prismaData.accountNumber);

    if (files.applicantPhoto) prismaData.photoUrl = files.applicantPhoto[0].filename;
    if (files.aadhaarProof) prismaData.aadhaarUrl = files.aadhaarProof[0].filename;
    if (files.panProof) prismaData.panUrl = files.panProof[0].filename;
    if (files.addressProof) prismaData.addressProofUrl = files.addressProof[0].filename;
    if (files.signature) prismaData.signatureUrl = files.signature[0].filename;

    return prisma.member.create({
      data: prismaData
    });
  }

  static async getMembers(startDate?: string, endDate?: string) {
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

    const members = await prisma.member.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { events: { orderBy: { createdAt: 'desc' } } }
    });

    return members.map((member: any) => ({
      ...member,
      panNumber: member.panNumber ? decrypt(member.panNumber) : null,
      aadhaarNumber: member.aadhaarNumber ? decrypt(member.aadhaarNumber) : null,
      accountNumber: member.accountNumber ? decrypt(member.accountNumber) : null,
    }));
  }

  static async getMemberById(id: string) {
    const member = await prisma.member.findUnique({ 
      where: { id },
      include: { events: { orderBy: { createdAt: 'desc' } } }
    });
    if (!member) throw new AppError('Member not found', 404);
    
    return {
      ...member,
      panNumber: member.panNumber ? decrypt(member.panNumber) : null,
      aadhaarNumber: member.aadhaarNumber ? decrypt(member.aadhaarNumber) : null,
      accountNumber: member.accountNumber ? decrypt(member.accountNumber) : null,
    };
  }

  static async getMemberDocumentPath(memberId: string, documentType: string) {
    const member = await prisma.member.findUnique({ where: { id: memberId } });
    if (!member) throw new AppError('Member not found', 404);

    let filename: string | null = null;
    switch(documentType) {
      case 'photo': filename = member.photoUrl; break;
      case 'aadhaarCard': filename = member.aadhaarUrl; break;
      case 'panCard': filename = member.panUrl; break;
      case 'addressProof': filename = member.addressProofUrl; break;
      case 'signature': filename = member.signatureUrl; break;
    }

    if (!filename) throw new AppError('Document not found', 404);

    return filename; // The caller handles path resolution
  }

  static async updateStatus(id: string, applicationStatus: string) {
    try {
      return await prisma.member.update({
        where: { id },
        data: { applicationStatus }
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new AppError('Member not found', 404);
      }
      throw error;
    }
  }

  static async deleteMember(id: string) {
    try {
      await prisma.member.delete({ where: { id } });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new AppError('Member not found', 404);
      }
      throw error;
    }
  }
}
