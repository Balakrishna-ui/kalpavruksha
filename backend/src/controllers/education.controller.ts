import { Request, Response, NextFunction } from 'express';
import { EducationService } from '../services/education.service';
import { AppError } from '../middleware/error.middleware';

export class EducationController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { fullName, mobileNumber, email, qualification, course, preferredMode } = req.body;

      // Validation
      if (!fullName || typeof fullName !== 'string' || fullName.trim() === '') {
        throw new AppError('Full Name is required.', 400);
      }
      if (!mobileNumber || !/^\d{10}$/.test(mobileNumber)) {
        throw new AppError('Please enter a valid 10-digit mobile number.', 400);
      }
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        throw new AppError('Please enter a valid email address.', 400);
      }
      if (!qualification || typeof qualification !== 'string' || qualification.trim() === '') {
        throw new AppError('Qualification is required.', 400);
      }
      if (!course || typeof course !== 'string' || course.trim() === '') {
        throw new AppError('Course preference is required.', 400);
      }
      if (!preferredMode || typeof preferredMode !== 'string' || preferredMode.trim() === '') {
        throw new AppError('Preferred mode is required.', 400);
      }
      
      // Additional safety limit (XSS / payload size)
      if (fullName.length > 100 || email.length > 100 || qualification.length > 100 || course.length > 100 || preferredMode.length > 50) {
        throw new AppError('Input length exceeds maximum allowed limit.', 400);
      }

      const enquiry = await EducationService.createEnquiry({
        fullName: fullName.trim(),
        mobileNumber: mobileNumber.trim(),
        email: email.trim(),
        qualification: qualification.trim(),
        course: course.trim(),
        preferredMode: preferredMode.trim(),
      });

      res.status(201).json(enquiry);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { startDate, endDate } = req.query;
      const enquiries = await EducationService.getEnquiries(
        startDate as string | undefined,
        endDate as string | undefined
      );
      res.json(enquiries);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await EducationService.deleteEnquiry(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
