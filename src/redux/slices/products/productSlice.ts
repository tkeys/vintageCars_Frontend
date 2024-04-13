import { apiSlice } from "../apiSlice";
import { Product, Category } from "../../../misc/type";

export const productSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchProducts: builder.query<Product[], void>({
      query: () => ` https://fakestoreapi.com/products`,
      keepUnusedDataFor: 5,
    }),

    fetchProduct: builder.query({
      query: (productId: number) => ({
        url: `https://fakestoreapi.com/products/${productId}`,
      }),
      keepUnusedDataFor: 5,

      providesTags: ["Product"],
    }),
    /* filterProductsByCategory: builder.query<Product[]>({
      query: (category: string) => `/api/v1/products/?categoryId=${category}`,
    }),
    sortProductsByPrice: builder.query<Product[]>({
      query: (order: "asc" | "desc") => `/api/v1/products/?order=${order}`,
    }),
    createNewProductAsync: builder.mutation<Product, ProductCreate>({
      query: (newProduct: ProductCreate) => `/api/v1/products`,
      invalidates: ["fetchProducts", "fetchProduct"],
    }),  */
  }),
});

export const { useFetchProductsQuery, useFetchProductQuery } = productSlice;
