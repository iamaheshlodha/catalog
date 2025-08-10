export interface ProductResponse {
  success: boolean;
  data: Product[];
  count: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  isActive: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  productType: ProductType;
  variants: Variant[];
  addOns: AddOn[];
}

export interface ProductType {
  id: string;
  name: string;
  description: string;
}

export interface Variant {
  id: string;
  sku: string;
  size: string;
  color: string | null;
  price: number;
  stock: number;
  isActive: boolean;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  isActive: boolean;
}

export interface ProductTypeResponse {
  success: boolean;
  data: ProductType[];
}

export interface ProductType {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    products: number;
  };
}
