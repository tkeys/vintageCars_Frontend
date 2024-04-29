import { apiSlice } from "../slices/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `http://localhost:8080/api/v1/auth/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `/auth/register`,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `/auth/logout`,
        method: "POST",
      }),
    }),
    profile: builder.mutation({
      query: ({ userId, data }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
      providesTags: ["Users"],
      keepUnusedDataFor: 6,
    }),
    deleteUser: builder.mutation({
      query: ({ _userId }) => ({
        url: `/users/${_userId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
} = usersApiSlice;
