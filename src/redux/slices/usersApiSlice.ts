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
        url: `http://localhost:8080/api/v1/auth/register`,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `http://localhost:8080/api/v1/auth/logout`,
        method: "POST",
      }),
    }),
    profile: builder.mutation({
      query: ({ userId, data }) => ({
        url: `http://localhost:8080/api/v1/users/${userId}`,
        method: "PUT",
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: `http://localhost:8080/api/v1/users`,
        method: "GET",
      }),
      providesTags: ["Users"],
      keepUnusedDataFor: 6,
    }),
    deleteUser: builder.mutation({
      query: ({ _userId }) => ({
        url: `http://localhost:8080/api/v1/users/${_userId}`,
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
