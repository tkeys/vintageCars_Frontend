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
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ordersUrl}/${orderId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 6,
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery } =
  ordersApiSlice;
