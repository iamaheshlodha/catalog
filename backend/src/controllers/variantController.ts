import { Request, Response, NextFunction } from 'express';
import { VariantService } from '../services/variantService';

export class VariantController {
  private variantService: VariantService;

  constructor() {
    this.variantService = new VariantService();
  }

  createVariant = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const variant = await this.variantService.createVariant(req.body);
      res.status(201).json({
        success: true,
        message: 'Variant created successfully',
        data: variant,
      });
    } catch (error) {
      next(error);
    }
  };

  getVariantsByProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productId } = req.params;
      const variants = await this.variantService.getVariantsByProduct(productId);
      res.json({
        success: true,
        data: variants,
      });
    } catch (error) {
      next(error);
    }
  };

  updateVariantStock = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { stock } = req.body;
      
      const variant = await this.variantService.updateVariantStock(id, stock);
      res.json({
        success: true,
        message: 'Variant stock updated successfully',
        data: variant,
      });
    } catch (error) {
      next(error);
    }
  };
}