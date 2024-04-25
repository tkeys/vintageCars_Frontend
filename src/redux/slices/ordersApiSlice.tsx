import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "../slices/apiSlice";
import { Order } from "../../misc/type";

const ordersUrl = "http://localhost:8080/api/v1/users/userId/orderlists";

const baseQuery = fetchBaseQuery({ baseUrl: ordersUrl });

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: ({ order }) => ({
        url: `http://localhost:8080/api/v1/users/userId/orderlists/orderListId`,
        method: "POST",
        body: { ...order },
      }),
    }),
    getOrderDetails: builder.query({
      query: (orderListId) => ({
        url: `http://localhost:8080/api/v1/users/userId/orderlists/${orderListId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 6,
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery } =
  ordersApiSlice;
