import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
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

  static async checkStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const query = (req.query.query || req.query.phone || req.query.memberId) as string;
      const status = await MembershipService.checkMemberStatus(query);
      res.json(status);
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
      const filename = await MembershipService.getMemberDocumentPath(memberId, documentId);
      const filePath = path.join(__dirname, '..', '..', 'uploads', filename);

      if (!fs.existsSync(filePath)) {
        return next(new AppError('Document file not found on server', 404));
      }

      const ext = path.extname(filename).toLowerCase();
      if (ext === '.pdf') {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
      } else if (ext === '.png') {
        res.setHeader('Content-Type', 'image/png');
      } else if (ext === '.jpg' || ext === '.jpeg') {
        res.setHeader('Content-Type', 'image/jpeg');
      } else if (ext === '.webp') {
        res.setHeader('Content-Type', 'image/webp');
      }

      res.sendFile(filePath);
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updated = await MembershipService.updateStatus(id, req.body);
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
