import { apiSlice } from "../slices/apiSlice";
//import { Product, Category } from "../../../misc/type";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: ` https://fakestoreapi.com/auth/login`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = usersApiSlice;
