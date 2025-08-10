import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddonSelector, VariantSelector } from "../components";
import { productService } from "../services";
import type { AddOn, Product, Variant } from "../api/types/api";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant>();
  const [selectedAddons, setSelectedAddons] = useState<AddOn[]>([]);
  const [loading, setLoading] = useState(false);

  // Calculate total price based on selected variant and addons
  const calculateTotalPrice = useCallback(() => {
    const basePrice = Number(selectedVariant?.price) || 0;
    const addonTotal = selectedAddons.reduce((total, addon) => total + (Number(addon.price) || 0), 0);
    return basePrice + addonTotal;
  }, [selectedVariant, selectedAddons]);

  const fetchProduct = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await productService.getProductById(id);
      setProduct(response.data);
      // Set the first variant as default selected variant
      if (response?.data?.variants?.length > 0) {
        setSelectedVariant(response.data.variants[0]);
      }
      // Initialize empty addons array
      setSelectedAddons([]);
    } catch (error) {
      console.error("Failed to fetch product", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  // Handle variant selection
  const handleVariantChange = useCallback((variant: Variant) => {
    setSelectedVariant(variant);
  }, []);

  // Handle addon selection
  const handleAddonChange = useCallback((addons: AddOn[]) => {
    setSelectedAddons(addons);
  }, []);

  if (loading) return <p>Loading product details...</p>;
  if (!product) return <p>Product not found.</p>;

  const totalPrice = calculateTotalPrice();

  return (
    <div className="max-w-4xl p-4 mx-auto">
      <div className="flex flex-col gap-6 md:flex-row">
        <img
          src={product?.images?.[0]}
          alt={product.name}
          className="w-full rounded md:w-1/2"
        />

        <div className="flex-1">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-sm text-gray-600">
            SKU: {selectedVariant?.sku || "N/A"}
          </p>
          <p className="mt-2 font-medium text-green-600">
            {selectedVariant && selectedVariant?.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>

          <VariantSelector
            variants={product.variants}
            selectedVariant={selectedVariant || null}
            onVariantChange={handleVariantChange}
          />

          <AddonSelector
            addOns={product.addOns}
            selectedAddons={selectedAddons}
            onAddonChange={handleAddonChange}
          />

          <p className="mt-4 text-xl font-bold">Total Price: ₹{totalPrice.toFixed(2)}</p>

          <button
            className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!selectedVariant || selectedVariant.stock <= 0}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductDetail);