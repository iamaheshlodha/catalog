export interface Variant {
  size: string;
  color: string;
  price: number;
  sku: string;
  stock: number;
}

export interface Addon {
  id: string;
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  type: string;
  image: string;
  variants: Variant[];
  addons?: Addon[];
}
