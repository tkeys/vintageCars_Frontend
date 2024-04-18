import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "../slices/apiSlice";
import { Order } from "../../misc/type";

const ordersUrl = "https://example.com/api/orders";

const baseQuery = fetchBaseQuery({ baseUrl: ordersUrl });

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order: Order) => ({
        url: ordersUrl,
        method: "POST",
        body: { ...order },
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = ordersApiSlice;
