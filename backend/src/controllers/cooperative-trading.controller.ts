import { Request, Response, NextFunction } from 'express';
import { CooperativeTradingService } from '../services/cooperative-trading.service';
import { AppError } from '../middleware/error.middleware';
import { CsvUtil } from '../utils/csv.util';

export class CooperativeTradingController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { fullName, businessName, mobileNumber, email, category } = req.body;
      
      if (!fullName || !fullName.trim()) {
        throw new AppError('Full Name is required.', 400);
      }
      if (!businessName || !businessName.trim()) {
        throw new AppError('Business Name is required.', 400);
      }
      if (!category || !category.trim() || category === 'Product / Service Category') {
        throw new AppError('Product / Service Category is required.', 400);
      }
      if (!mobileNumber || !/^\d{10}$/.test(mobileNumber.trim())) {
        throw new AppError('Please enter a valid 10-digit mobile number.', 400);
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        throw new AppError('Please enter a valid email address.', 400);
      }

      const enquiry = await CooperativeTradingService.createEnquiry(req.body);
      res.status(201).json(enquiry);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { startDate, endDate, status } = req.query;
      const enquiries = await CooperativeTradingService.getEnquiries(
        startDate as string | undefined, 
        endDate as string | undefined,
        status as string | undefined
      );
      res.json(enquiries);
    } catch (error) {
      next(error);
    }
  }

  static async exportData(req: Request, res: Response, next: NextFunction) {
    try {
      const { startDate, endDate, status } = req.query;
      const enquiries = await CooperativeTradingService.getEnquiries(
        startDate as string | undefined, 
        endDate as string | undefined,
        status as string | undefined
      );
      
      const csvData = CsvUtil.generateCsv(enquiries);
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="cooperative-trading-enquiries.csv"');
      res.status(200).send(csvData);
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updated = await CooperativeTradingService.updateStatus(id, status);
      res.json(updated);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await CooperativeTradingService.deleteEnquiry(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
