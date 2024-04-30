import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://vintagecarshop-backend.onrender.com/api/v1/",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
      headers.set("Authorization", `Bearer ${token}`);
    }
    /* headers.append("Origin", "Access-Control-Allow-Origin"); */
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  reducerPath: "api",
  tagTypes: ["Product", "Products", "Order", "User", "Users", "Cart"],
  endpoints: (builder) => ({}),
});
