import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: "",
    retry: 3
});

const apiSlice = createApi({

    baseQuery,
    tagTypes: ["User"],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `/api/users/auth`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: (res, err, { id }) => ['User', res._id]
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `/api/users/`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: (res, err, { id }) => ['User', res._id]
        }),
        logout: builder.mutation({
            query: () => ({
                url: `/api/users/logout`,
                method: "POST",
            }),
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `/api/users/home`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (res, err ) => ['User', res._id]
        }),
        adminLogin: builder.mutation({
            query: (data) => ({
                url: `/api/admin/auth`,
                method: "POST",
                body: data,
            }),
        }),
        adminLogout: builder.mutation({
            query: () => ({
                url: `/api/admin/logout`,
                method: "POST",
            }),
        }),
        updateUsers: builder.mutation({
            query: payload => ({
                url: `/api/admin/${payload.id}`,
                method: "PUT",
                body: payload
            }),
            invalidatesTags: (res, err, { id }) => ['User', id]
        })
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useUpdateUserMutation,
    useAdminLoginMutation,
    useAdminLogoutMutation,
} = apiSlice;

export default apiSlice;
