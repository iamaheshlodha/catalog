import { PrismaClient } from '@prisma/client';
import Database from '../config/database';
import { CreateAddOnRequest } from '../types';

export class AddOnService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = Database.getInstance();
  }

  async createAddOn(data: CreateAddOnRequest) {
    // Check if product exists and is Food type
    const product = await this.prisma.product.findUnique({
      where: { id: data.productId, isActive: true },
      include: {
        productType: true,
      },
    });

    if (!product) {
      throw new Error('Product not found or inactive');
    }

    if (product.productType.name.toLowerCase() !== 'food') {
      throw new Error('Add-ons can only be created for Food items');
    }

    return await this.prisma.addOn.create({
      data: {
        ...data,
        price: data.price,
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async getAddOnsByProduct(productId: string) {
    return await this.prisma.addOn.findMany({
      where: { productId, isActive: true },
      orderBy: { name: 'asc' },
    });
  }
}