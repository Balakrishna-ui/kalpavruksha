import { Request, Response, NextFunction } from 'express';
import { FinancialService } from '../services/financial.service';
import { AppError } from '../middleware/error.middleware';
import { CsvUtil } from '../utils/csv.util';

export class FinancialController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { phoneNumber } = req.body;
      if (!phoneNumber || !/^\d{10}$/.test(phoneNumber)) {
        throw new AppError('Please enter a valid 10-digit mobile number.', 400);
      }
      
      const enquiry = await FinancialService.createEnquiry(req.body);
      res.status(201).json(enquiry);
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
