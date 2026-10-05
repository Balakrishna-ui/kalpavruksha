import { Request, Response, NextFunction } from 'express';
import prisma from '../config/database';
import { FinancialService } from '../services/financial.service';
import { AppError } from '../middleware/error.middleware';
import { CsvUtil } from '../utils/csv.util';

export class FinancialController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { phoneNumber, investmentAmount, selectedScheme } = req.body;
      if (!phoneNumber || !/^\d{10}$/.test(phoneNumber)) {
        throw new AppError('Please enter a valid 10-digit mobile number.', 400);
      }

      let kTipAmount: number | null = null;
      let membershipFee = 0;
      let totalPayable = 0;
      let isNewMember = true;

      const isKtip = selectedScheme && selectedScheme.includes('K-TIP');
      if (isKtip) {
        // Extract numeric contribution from investmentAmount (e.g. "₹500 / Month", "500", "Custom: ₹750")
        const amountMatch = String(investmentAmount || '').replace(/,/g, '').match(/\d+/);
        if (!amountMatch) {
          throw new AppError('Please select or enter a valid monthly contribution amount between ₹200 and ₹5,000.', 400);
        }
        kTipAmount = parseInt(amountMatch[0], 10);
        if (isNaN(kTipAmount) || kTipAmount < 200 || kTipAmount > 5000) {
          throw new AppError('K-TIP monthly contribution amount must be between ₹200 and ₹5,000.', 400);
        }

        // Server-side authoritative check for existing member in DB
        const existingMember = await prisma.member.findFirst({
          where: {
            OR: [
              { mobileNumber: phoneNumber },
              { phone: phoneNumber }
            ]
          },
          orderBy: { createdAt: 'desc' }
        });

        if (existingMember && (existingMember.paymentStatus === 'Paid' || existingMember.applicationStatus === 'APPROVED')) {
          isNewMember = false;
          membershipFee = 0;
          totalPayable = kTipAmount;
        } else {
          isNewMember = true;
          membershipFee = 120;
          totalPayable = kTipAmount + 120;
        }

        // Authoritative server-side formatted investmentAmount and message
        req.body.investmentAmount = `₹${kTipAmount.toLocaleString('en-IN')} / Month (Initial: ₹${totalPayable.toLocaleString('en-IN')})`;
        const feeNote = `Fee: ₹${membershipFee} (${isNewMember ? 'New Member 1st-time' : 'Existing Member Waived'}) | Total Initial: ₹${totalPayable}`;
        req.body.message = req.body.message ? `${req.body.message} | ${feeNote}` : feeNote;
      }
      
      const enquiry = await FinancialService.createEnquiry(req.body);
      res.status(201).json({
        ...enquiry,
        kTipAmount,
        membershipFee,
        totalPayable,
        isNewMember
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { startDate, endDate } = req.query;
      const enquiries = await FinancialService.getEnquiries(
        startDate as string | undefined, 
        endDate as string | undefined
      );
      res.json(enquiries);
    } catch (error) {
      next(error);
    }
  }

  static async exportData(req: Request, res: Response, next: NextFunction) {
    try {
      const { startDate, endDate } = req.query;
      const enquiries = await FinancialService.getEnquiries(
        startDate as string | undefined, 
        endDate as string | undefined
      );
      
      const csvData = CsvUtil.generateCsv(enquiries);
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="financial_enquiries.csv"');
      res.status(200).send(csvData);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await FinancialService.deleteEnquiry(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
