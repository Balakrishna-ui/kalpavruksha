import { Request, Response, NextFunction } from 'express';
import { EnquiryService } from '../services/enquiry.service';
import { AppError } from '../middleware/error.middleware';
import { CsvUtil } from '../utils/csv.util';

export class EnquiryController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { phone, email } = req.body;
      if (!phone || !/^\d{10}$/.test(phone)) {
        throw new AppError('Please enter a valid 10-digit mobile number.', 400);
      }
      if (email && !/\S+@\S+\.\S+/.test(email)) {
        throw new AppError('Please enter a valid email address.', 400);
      }

      const enquiry = await EnquiryService.createEnquiry(req.body);
      res.status(201).json(enquiry);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { startDate, endDate } = req.query;
      const enquiries = await EnquiryService.getEnquiries(
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
      const enquiries = await EnquiryService.getEnquiries(
        startDate as string | undefined, 
        endDate as string | undefined
      );
      
      const csvData = CsvUtil.generateCsv(enquiries);
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="enquiries.csv"');
      res.status(200).send(csvData);
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updated = await EnquiryService.updateStatus(id, status);
      res.json(updated);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await EnquiryService.deleteEnquiry(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
