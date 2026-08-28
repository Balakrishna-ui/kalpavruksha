import { Request, Response, NextFunction } from 'express';
import { EntityService } from '../services/entity.service';

export class EntityController {
  static async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await EntityService.getProducts();
      res.json(products);
    } catch (error) { next(error); }
  }

  static async getProductBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await EntityService.getProductBySlug(req.params.slug);
      res.json(product);
    } catch (error) { next(error); }
  }

  static async getProjects(req: Request, res: Response, next: NextFunction) {
    try {
      const projects = await EntityService.getProjects();
      res.json(projects);
    } catch (error) { next(error); }
  }

  static async getProjectBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const project = await EntityService.getProjectBySlug(req.params.slug);
      res.json(project);
    } catch (error) { next(error); }
  }

  static async getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await EntityService.getOrders();
      res.json(orders);
    } catch (error) { next(error); }
  }

  static async getLeadership(req: Request, res: Response, next: NextFunction) {
    try {
      const team = await EntityService.getLeadership();
      res.json(team);
    } catch (error) { next(error); }
  }
}
