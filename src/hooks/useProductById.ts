import React, { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}

interface Category {
  id: number;
  name: string;
  image: string;
}

const useProductById = (productId: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        ` https://api.escuelajs.co/api/v1/products/${productId}`
      );
      console.log(`Fetching product for page successful`);
      console.log(response.data);
      setProduct(response.data);
      setError(null);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  return { product, loading, error };
};

export default useProductById;
