import React from "react";
import type { Product } from "../api/types/api";

interface ProductDetailProps {
  product: Product;
}

const ProductCard: React.FC<ProductDetailProps> = ({ product }) => {
  return (
    <div className="p-4 transition border rounded-lg shadow cursor-pointer hover:shadow-md">
      <img src={product.images[0]} alt="Product" className="object-contain w-full h-40 rounded" />
      <h2 className="mt-2 text-lg font-semibold">{product.name}</h2>
      <p className="text-sm text-gray-500">Type: {product.productType.name}</p>
      <p className="mt-1 font-bold">₹{product.variants[0].price}</p>
    </div>
  );
};

export default React.memo(ProductCard)