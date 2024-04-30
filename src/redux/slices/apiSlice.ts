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
    /*   headers.append("origin", "Access-Control-Allow-Origin"); */
    headers.append("Origin", "https://fs17-e-commerce-project.vercel.app/");
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  reducerPath: "api",
  tagTypes: ["Product", "Products", "Order", "User", "Users", "Cart"],
  endpoints: (builder) => ({}),
});
