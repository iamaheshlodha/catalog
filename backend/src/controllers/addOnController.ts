import { Request, Response, NextFunction } from 'express';
import { AddOnService } from '../services/addOnService';

export class AddOnController {
  private addOnService: AddOnService;

  constructor() {
    this.addOnService = new AddOnService();
  }

  createAddOn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const addOn = await this.addOnService.createAddOn(req.body);
      res.status(201).json({
        success: true,
        message: 'Add-on created successfully',
        data: addOn,
      });
    } catch (error) {
      next(error);
    }
  };

  getAddOnsByProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productId } = req.params;
      const addOns = await this.addOnService.getAddOnsByProduct(productId);
      res.json({
        success: true,
        data: addOns,
      });
    } catch (error) {
      next(error);
    }
  };
}