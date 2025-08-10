import { PrismaClient } from '@prisma/client';
import Database from '../config/database';
import { CreateProductRequest, ProductWithDetails } from '../types';

export class ProductService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = Database.getInstance();
  }

  async createProduct(data: CreateProductRequest) {
    return await this.prisma.product.create({
      data,
      include: {
        productType: true,
      },
    });
  }

  async getAllProductsWithDetails(filter?: { type?: string }): Promise<ProductWithDetails[]> {
    const whereCondition: any = { isActive: true };

    // Agar filter.type aaya hai to productType me filter lagao
    if (filter?.type) {
      whereCondition.productType = {
        name: filter.type,
      };
    }

    const products = await this.prisma.product.findMany({
      where: whereCondition,
      include: {
        productType: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
        variants: {
          where: { isActive: true },
          orderBy: { price: "asc" },
          select: {
            id: true,
            sku: true,
            size: true,
            color: true,
            price: true,
            stock: true,
            isActive: true,
          },
        },
        addOns: {
          where: { isActive: true },
          orderBy: { name: "asc" },
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            isActive: true,
          },
        },
      },
      orderBy: { name: "asc" },
    });

    return products.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      images: product.images,
      isActive: product.isActive,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      productType: product.productType,
      variants: product.variants.map(variant => ({
        id: variant.id,
        sku: variant.sku,
        size: variant.size,
        color: variant.color,
        price: parseFloat(variant.price.toString()),
        stock: variant.stock,
        isActive: variant.isActive,
      })),
      addOns: product.addOns?.map(addOn => ({
        id: addOn.id,
        name: addOn.name,
        description: addOn.description,
        price: parseFloat(addOn.price.toString()),
        isActive: addOn.isActive,
      })) || [],
    }));
  }

  async getProductsByType(productTypeId: string) {
    return await this.prisma.$queryRaw<any[]>`
      SELECT 
        p.id,
        p.name,
        p.description,
        p.images,
        p.is_active as "isActive",
        pt.name as "productTypeName",
        COUNT(DISTINCT v.id) as "variantCount",
        COUNT(DISTINCT a.id) as "addOnCount",
        MIN(v.price::numeric) as "minPrice",
        MAX(v.price::numeric) as "maxPrice",
        SUM(v.stock) as "totalStock"
      FROM products p
      INNER JOIN product_types pt ON p.product_type_id = pt.id
      LEFT JOIN variants v ON p.id = v.product_id AND v.is_active = true
      LEFT JOIN add_ons a ON p.id = a.product_id AND a.is_active = true
      WHERE p.product_type_id = ${productTypeId} AND p.is_active = true
      GROUP BY p.id, pt.name
      ORDER BY p.name;
    `;
  }

  async getProductWithCompleteDetails(productId: string) {
    return await this.prisma.product.findUnique({
      where: { id: productId, isActive: true },
      include: {
        productType: true,
        variants: {
          where: { isActive: true },
          orderBy: { price: 'asc' },
        },
        addOns: {
          where: { isActive: true },
          orderBy: { name: 'asc' },
        },
      },
    });
  }

  async searchProducts(searchTerm: string, productTypeId?: string) {
    const whereClause: any = {
      isActive: true,
      OR: [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { description: { contains: searchTerm, mode: 'insensitive' } },
      ],
    };

    if (productTypeId) {
      whereClause.productTypeId = productTypeId;
    }

    return await this.prisma.product.findMany({
      where: whereClause,
      include: {
        productType: true,
        variants: {
          where: { isActive: true },
          orderBy: { price: 'asc' },
        },
        addOns: {
          where: { isActive: true },
        },
      },
      orderBy: { name: 'asc' },
    });
  }
}