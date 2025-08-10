import React, { useCallback, useEffect, useState } from "react";
import { ProductCard, ProductTypeTabs } from "../components";
import { productService } from "../services";
import type { ProductResponse } from "../api/types/api";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const [products, setProducts] = useState<ProductResponse>()
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState<string>('All')

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const products = await productService.getAllProducts({ type: type === 'All' ? '' : type })
      setProducts(products)
    } catch (error) {
      console.error("Failed to fetch product", error);
    } finally {
      setLoading(false);
    }
  }, [type])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Product Catalog</h1>
      <ProductTypeTabs
        activeType={type}
        setActiveType={setType}
      />

      {
        loading ?
          <div>
            <p>Loading....</p>
          </div> :
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 md:grid-cols-3">
            {products?.data?.map((data, i) => (
              <Link to={`/product/${data.id}`}>
                <ProductCard product={data} key={i} />
              </Link>
            ))}
          </div>
      }
    </div>
  );
};

export default React.memo(Home)
