import { PrismaClient } from '@prisma/client';
import Database from '../config/database';
import { CreateVariantRequest } from '../types';

export class VariantService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = Database.getInstance();
  }

  async createVariant(data: CreateVariantRequest) {
    // Check if product exists and is active
    const product = await this.prisma.product.findUnique({
      where: { id: data.productId, isActive: true },
    });

    if (!product) {
      throw new Error('Product not found or inactive');
    }

    return await this.prisma.variant.create({
      data: {
        ...data,
        price: data.price,
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            productType: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async getVariantsByProduct(productId: string) {
    return await this.prisma.variant.findMany({
      where: { productId, isActive: true },
      orderBy: [{ price: 'asc' }, { size: 'asc' }, { color: 'asc' }],
    });
  }

  async updateVariantStock(variantId: string, newStock: number) {
    return await this.prisma.variant.update({
      where: { id: variantId },
      data: { stock: newStock },
    });
  }
}