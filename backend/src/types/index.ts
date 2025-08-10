export interface CreateProductTypeRequest {
  name: string;
  description?: string;
}

export interface CreateProductRequest {
  name: string;
  description?: string;
  productTypeId: string;
  images?: string[];
}

export interface CreateVariantRequest {
  sku: string;
  size?: string;
  color?: string;
  price: number;
  stock: number;
  productId: string;
}

export interface CreateAddOnRequest {
  name: string;
  description?: string;
  price: number;
  productId: string;
}

export interface ProductWithDetails {
  id: string;
  name: string;
  description: string | null;
  images: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  productType: {
    id: string;
    name: string;
    description: string | null;
  };
  variants: Array<{
    id: string;
    sku: string;
    size: string | null;
    color: string | null;
    price: number;
    stock: number;
    isActive: boolean;
  }>;
  addOns?: Array<{
    id: string;
    name: string;
    description: string | null;
    price: number;
    isActive: boolean;
  }>;
}