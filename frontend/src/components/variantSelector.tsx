import React, { useEffect, useState } from "react";
import type { Variant } from "../api/types/api";

interface Props {
  variants: Variant[];
  selectedVariant: Variant | null;
  onVariantChange: (variant: Variant) => void;
}

export const VariantSelector: React.FC<Props> = ({
  variants,
  selectedVariant,
  onVariantChange
}) => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const uniqueSizes = [...new Set(variants.map(v => v.size))];
  const uniqueColors = [...new Set(variants.map(v => v.color))];

  // Set initial values
  useEffect(() => {
    if (selectedVariant) {
      setSelectedSize(selectedVariant.size);
      setSelectedColor(selectedVariant.color || '');
    } else if (variants && variants.length > 0) {
      const firstVariant = variants[0];
      setSelectedSize(firstVariant.size);
      setSelectedColor(firstVariant.color || '');
      onVariantChange(firstVariant);
    }
  }, [selectedVariant, variants, onVariantChange]);

  // Find variant based on size and color selection
  const findVariant = (size: string, color: string | null) => {
    return variants.find(v => v.size === size && v.color === color);
  };

  // Handle size change
  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    const variant = findVariant(size, selectedColor || null);
    if (variant) {
      onVariantChange(variant);
    } else {
      // If no variant found with current color, try with first available color for this size
      const availableColors = variants
        .filter(v => v.size === size)
        .map(v => v.color);
      if (availableColors.length > 0) {
        const newColor = availableColors[0];
        setSelectedColor(newColor || '');
        const newVariant = findVariant(size, newColor || '');
        if (newVariant) {
          onVariantChange(newVariant);
        }
      }
    }
  };

  // Handle color change
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    const variant = findVariant(selectedSize, color);
    if (variant) {
      onVariantChange(variant);
    } else {
      // If no variant found with current size, try with first available size for this color
      const availableSizes = variants
        .filter(v => v.color === color)
        .map(v => v.size);
      if (availableSizes.length > 0) {
        const newSize = availableSizes[0];
        setSelectedSize(newSize);
        const newVariant = findVariant(newSize, color);
        if (newVariant) {
          onVariantChange(newVariant);
        }
      }
    }
  };

  // Get available colors for selected size
  const getAvailableColors = (size: string | null) => {
    return variants
      .filter(v => v.size === size)
      .map(v => v.color);
  };

  const availableColorsForSize = getAvailableColors(selectedSize);

  return (
    <div className="mt-4">
      <h2 className="mb-3 font-semibold">Select Variant</h2>

      <div className="flex flex-col gap-4 md:flex-row md:gap-6">
        {/* Size Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Size:</label>
          <select
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedSize}
            onChange={(e) => handleSizeChange(e.target.value)}
          >
            <option value="" disabled>Select Size</option>
            {uniqueSizes.map(size => {
              const hasStock = variants.some(v => v.size === size && v.stock > 0);
              return (
                <option
                  key={size}
                  value={size}
                  disabled={!hasStock}
                >
                  {size} {!hasStock ? "(Out of Stock)" : ""}
                </option>
              );
            })}
          </select>
        </div>

        {/* Color Selector */}
        {uniqueColors && uniqueColors[0] != null &&
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Color:</label>
            <select
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedColor || ''}
              onChange={(e) => handleColorChange(e.target.value)}
            >
              <option value="" disabled>Select Color</option>
              {uniqueColors.map(color => {
                const hasStock = variants.some(v => v.color === color && v.stock > 0);
                const isAvailableForSize = availableColorsForSize.includes(color);
                return (
                  <option
                    key={color}
                    value={color || ''}
                    disabled={!hasStock || !isAvailableForSize}
                  >
                    {color} {!hasStock ? "(Out of Stock)" : !isAvailableForSize ? "(Not available in selected size)" : ""}
                  </option>
                );
              })}
            </select>
          </div>
        }
      </div>

      {/* Selected Variant Details */}
      {selectedVariant && (
        <div className="p-4 mt-4 border rounded-lg bg-gray-50">
          <h3 className="mb-2 font-medium text-gray-800">Selected Variant:</h3>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
            <div><strong>Size:</strong> {selectedVariant.size}</div>
            {selectedVariant.color && <div><strong>Color:</strong> {selectedVariant.color}</div>}
            <div><strong>Price:</strong> ₹{selectedVariant.price}</div>
            <div><strong>Stock:</strong> {selectedVariant.stock} available</div>
            <div className="col-span-2"><strong>SKU:</strong> {selectedVariant.sku}</div>
          </div>

          {/* Stock Status */}
          <div className="mt-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${selectedVariant.stock > 0
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
              }`}>
              {selectedVariant.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(VariantSelector);