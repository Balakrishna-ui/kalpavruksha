import { Request, Response, NextFunction } from 'express';
import { BusinessConsultancyService } from '../services/business-consultancy.service';
import { AppError } from '../middleware/error.middleware';
import { CsvUtil } from '../utils/csv.util';

export class BusinessConsultancyController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { businessName, contactPerson, mobile, email, industry, serviceRequired } = req.body;
      
      if (!businessName || !businessName.trim()) {
        throw new AppError('Business Name is required.', 400);
      }
      if (!contactPerson || !contactPerson.trim()) {
        throw new AppError('Contact Person is required.', 400);
      }
      if (!industry || !industry.trim()) {
        throw new AppError('Industry / Business Type is required.', 400);
      }
      if (!serviceRequired || !serviceRequired.trim()) {
        throw new AppError('Nature of Service Required is required.', 400);
      }
      if (!mobile || !/^\d{10}$/.test(mobile)) {
        throw new AppError('Please enter a valid 10-digit mobile number.', 400);
      }
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        throw new AppError('Please enter a valid email address.', 400);
      }

      const enquiry = await BusinessConsultancyService.createEnquiry(req.body);
      res.status(201).json(enquiry);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { startDate, endDate } = req.query;
      const enquiries = await BusinessConsultancyService.getEnquiries(
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
      const enquiries = await BusinessConsultancyService.getEnquiries(
        startDate as string | undefined, 
        endDate as string | undefined
      );
      
      const csvData = CsvUtil.generateCsv(enquiries);
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="business-consultancy-enquiries.csv"');
      res.status(200).send(csvData);
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updated = await BusinessConsultancyService.updateStatus(id, status);
      res.json(updated);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await BusinessConsultancyService.deleteEnquiry(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
