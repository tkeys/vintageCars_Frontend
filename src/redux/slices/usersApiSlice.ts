import { apiSlice } from "../slices/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `https://api.escuelajs.co/api/v1/auth/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `https://api.escuelajs.co/api/v1/auth/register`,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation<void, void>({
      queryFn: () => {
        // Clear user data and authentication tokens from client-side storage
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
        document.cookie =
          "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        // Return success indication without making an API call
        return { data: undefined };
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  usersApiSlice;
