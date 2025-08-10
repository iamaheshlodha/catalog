import { Request, Response, NextFunction } from 'express';
import { ProductTypeService } from '../services/productTypeService';

export class ProductTypeController {
  private productTypeService: ProductTypeService;

  constructor() {
    this.productTypeService = new ProductTypeService();
  }

  createProductType = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productType = await this.productTypeService.createProductType(req.body);
      res.status(201).json({
        success: true,
        message: 'Product type created successfully',
        data: productType,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllProductTypes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productTypes = await this.productTypeService.getAllProductTypes();
      res.json({
        success: true,
        data: productTypes,
      });
    } catch (error) {
      next(error);
    }
  };

  getProductTypeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const productType = await this.productTypeService.getProductTypeById(id);
      
      if (!productType) {
        return res.status(404).json({
          success: false,
          message: 'Product type not found',
        });
      }

      res.json({
        success: true,
        data: productType,
      });
    } catch (error) {
      next(error);
    }
  };
}