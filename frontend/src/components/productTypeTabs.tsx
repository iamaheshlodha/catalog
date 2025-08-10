import React, { useCallback, useEffect, useState } from "react";
import { productService } from "../services";
import type { ProductTypeResponse } from "../api/types/api";

interface ProductTypeProps {
  activeType: string; 
  setActiveType: React.Dispatch<React.SetStateAction<string>>;
}

const ProductTypeTabs: React.FC<ProductTypeProps> = ({
  setActiveType,
  activeType
}) => {
  const [productTypes, setProductTypes] = useState<ProductTypeResponse>()

  const fetchProductTypes = useCallback(async () => {
    try {
      const types = await productService.getAllProductTypes()
      setProductTypes(types)
    } catch (error) {
      console.error("Failed to fetch product type", error);
    } finally {
      console.log('Response');
    }
  }, [])

  useEffect(() => {
    fetchProductTypes()
  }, [fetchProductTypes])

  return (
    <div className="flex gap-6 mb-4 border-b border-gray-200">
      <button
        onClick={() => setActiveType('All')}
        className={`relative pb-2 text-sm font-medium transition-colors duration-200
            ${activeType === 'All'
            ? "text-blue-600"
            : "text-gray-500 hover:text-blue-500"}`}
      >
        All
        {activeType === 'All' && (
          <span className="absolute left-0 -bottom-[1px] h-0.5 w-full bg-blue-600 rounded-full" />
        )}
      </button>
      {productTypes?.data.map((type, i) => (
        <button
          key={i}
          onClick={() => setActiveType(type.name)}
          className={`relative pb-2 text-sm font-medium transition-colors duration-200
            ${activeType === type.name
              ? "text-blue-600"
              : "text-gray-500 hover:text-blue-500"}`}
        >
          {type.name}
          {activeType === type.name && (
            <span className="absolute left-0 -bottom-[1px] h-0.5 w-full bg-blue-600 rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
};

export default React.memo(ProductTypeTabs);
