import { apiSlice } from "../apiSlice";
import { ProductType, Category, ProductPageType } from "../../../misc/type";

export const productSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchProducts: builder.query<ProductPageType, string>({
      query: (searchQuery) => ({
        url: ` http://localhost:8080/api/v1/cars`,
        params: {
          searchQuery,
        },
      }),

      keepUnusedDataFor: 5,
      providesTags: ["Products"],
    }),

    fetchProduct: builder.query({
      query: (_id: string) => ({
        url: `http://localhost:8080/api/v1/cars/${_id}`,
      }),
      keepUnusedDataFor: 5,

      providesTags: ["Product"],
    }),

    createProduct: builder.mutation({
      query: () => ({
        url: ` http://localhost:8080/api/v1/cars`,
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation({
      query: (data) => ({
        url: `http://localhost:8080/api/v1/cars/${data._id}`,
        method: "PUT",
        body: data,
      }),

      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (_id: string) => ({
        url: `http://localhost:8080/api/v1/cars/${_id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchProductsQuery,
  useFetchProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productSlice;
