import { apiSlice } from "../apiSlice";
import { ProductType, Category, ProductPageType } from "../../../misc/type";
/**
 * @desc apiSlice will add base url to the following endpoints
 * @example /cars will be https://vintagecarshop-backend.onrender.com/api/v1/cars or if
 * the base url in the apiSlice was http://localhost:3000/api/v1 will be http://localhost:3000/api/v1/cars
 */
export const productSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchProducts: builder.query<ProductPageType, string>({
      query: (searchQuery) => ({
        url: "/cars/",
        params: {
          searchQuery,
        },
      }),
      keepUnusedDataFor: 5,

      providesTags: ["Products"],
    }),

    fetchProduct: builder.query({
      query: (_id: string) => ({
        url: `/cars/${_id}`,
      }),
      keepUnusedDataFor: 5,

      providesTags: ["Product"],
    }),

    createProduct: builder.mutation({
      query: () => ({
        url: `/cars`,
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation({
      query: (data) => ({
        url: `/cars/${data._id}`,
        method: "PUT",
        body: data,
      }),

      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (_id: string) => ({
        url: `/cars/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
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
