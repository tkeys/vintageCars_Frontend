import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "../slices/apiSlice";
import { Order } from "../../misc/type";

const ordersUrl = "/users/userId/orderlists";

const baseQuery = fetchBaseQuery({ baseUrl: ordersUrl });

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: ({ order }) => ({
        url: `/users/userId/orderlists/orderListId`,
        method: "POST",
        body: { ...order },
      }),
    }),
    getOrderDetails: builder.query({
      query: ({ orderListId, userId }) => ({
        url: `/users/${userId}/orderlists/${orderListId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 6,
    }),
    getMyOrders: builder.query({
      query: ({ userId, orderListId }) => ({
        url: `/users/${userId}/orderlists/${orderListId}`,
        method: "GET",
      }),

      keepUnusedDataFor: 6,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  useGetMyOrdersQuery,
} = ordersApiSlice;
