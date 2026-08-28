import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { MembershipService } from '../services/membership.service';
import { AppError } from '../middleware/error.middleware';
import { CsvUtil } from '../utils/csv.util';

export class MembershipController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const membership = await MembershipService.createMembership(req.body, files || {});
      res.status(201).json(membership);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { startDate, endDate } = req.query;
      const members = await MembershipService.getMembers(
        startDate as string | undefined,
        endDate as string | undefined
      );
      res.json(members);
    } catch (error) {
      next(error);
    }
  }

  static async exportData(req: Request, res: Response, next: NextFunction) {
    try {
      const { startDate, endDate } = req.query;
      const members = await MembershipService.getMembers(
        startDate as string | undefined,
        endDate as string | undefined
      );

      // Strip sensitive fields
      const safeMembers = members.map((member: any) => {
        const { 
          aadhaarNumber, 
          panNumber, 
          accountNumber, 
          photoUrl, 
          signatureUrl,
          aadhaarUrl,
          panUrl,
          addressProofUrl,
          nomineeAadhaar,
          events,
          ...safeData 
        } = member;
        return safeData;
      });

      const csvData = CsvUtil.generateCsv(safeMembers);
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="memberships.csv"');
      res.status(200).send(csvData);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const member = await MembershipService.getMemberById(id);
      res.json(member);
    } catch (error) {
      next(error);
    }
  }

  static async getDocument(req: Request, res: Response, next: NextFunction) {
    try {
      const { memberId, documentId } = req.params;
      // documentId is the property name, e.g., 'photo', 'panCard'
      const filename = await MembershipService.getMemberDocumentPath(memberId, documentId);
      const filePath = path.join(__dirname, '..', '..', 'uploads', filename);
      res.sendFile(filePath);
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updated = await MembershipService.updateStatus(id, status);
      res.json(updated);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await MembershipService.deleteMember(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
