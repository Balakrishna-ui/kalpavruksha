import { Request, Response, NextFunction } from 'express';
import { ServiceRequestService } from '../services/service.service';
import { CsvUtil } from '../utils/csv.util';

export class ServiceController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      // Input validation could be extracted, but keeping it simple for now
      const request = await ServiceRequestService.createServiceRequest(req.body);
      res.status(201).json(request);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { startDate, endDate, category } = req.query;
      const requests = await ServiceRequestService.getServiceRequests(
        startDate as string | undefined, 
        endDate as string | undefined,
        category as string | undefined
      );
      res.json(requests);
    } catch (error) {
      next(error);
    }
  }

  static async exportData(req: Request, res: Response, next: NextFunction) {
    try {
      const { startDate, endDate, category } = req.query;
      const requests = await ServiceRequestService.getServiceRequests(
        startDate as string | undefined, 
        endDate as string | undefined,
        category as string | undefined
      );
      
      const csvData = CsvUtil.generateCsv(requests);
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="services.csv"');
      res.status(200).send(csvData);
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updated = await ServiceRequestService.updateStatus(id, status);
      res.json(updated);
    } catch (error) {
      next(error);
    }
  }
}
