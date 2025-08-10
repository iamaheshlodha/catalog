import { PrismaClient } from '@prisma/client';
import Database from '../config/database';
import { CreateProductTypeRequest } from '../types';

export class ProductTypeService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = Database.getInstance();
  }

  async createProductType(data: CreateProductTypeRequest) {
    return await this.prisma.productType.create({
      data,
    });
  }

  async getAllProductTypes() {
    return await this.prisma.productType.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });
  }

  async getProductTypeById(id: string) {
    return await this.prisma.productType.findUnique({
      where: { id },
      include: {
        products: {
          where: { isActive: true },
          select: {
            id: true,
            name: true,
            images: true,
          },
        },
      },
    });
  }
}