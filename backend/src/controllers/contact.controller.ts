import { Request, Response, NextFunction } from 'express';
import { ContactService } from '../services/contact.service';
import { AppError } from '../middleware/error.middleware';

export class ContactController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { mobileNumber } = req.body;
      if (!mobileNumber || !/^\d{10}$/.test(mobileNumber)) {
        throw new AppError('Please enter a valid 10-digit mobile number.', 400);
      }

      const request = await ContactService.createContactRequest(req.body);
      res.status(201).json(request);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { startDate, endDate } = req.query;
      const requests = await ContactService.getContactRequests(
        startDate as string | undefined, 
        endDate as string | undefined
      );
      res.json(requests);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await ContactService.deleteContactRequest(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
