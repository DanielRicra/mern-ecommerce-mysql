import { useState, useEffect } from 'react';
import { findAllProducts } from '../../services/services';
import { ProductsResponse } from '../../types/types';

const defaultProductResponse: ProductsResponse = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

const useProducts = () => {
  const [productsResponse, setProductsResponse] = useState<ProductsResponse>(
    defaultProductResponse,
  );

  const [page, setPage] = useState(1);

  useEffect(() => {
    let isCancelled = false;
    async function getAllProducts(p: number) {
      const response = await findAllProducts(p);
      if (!isCancelled) {
        setProductsResponse(response.data);
      }
    }
    getAllProducts(page);

    return () => {
      isCancelled = true;
    };
  }, [page]);

  return { productsResponse, setPage };
};

export default useProducts;
