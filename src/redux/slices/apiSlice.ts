import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    console.log(token);
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
      headers.append("Origin", "Access-Control-Allow-Origin");
    }

    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Products", "Order", "User", "Users", "Cart"],
  endpoints: (builder) => ({}),
});
