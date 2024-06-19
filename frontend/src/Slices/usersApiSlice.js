import { apiSlice } from "./apiSlice";

const USER_URL = '/api/users';
const ADMIN_URL = '/api/admin';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: data => ({
                url: `${USER_URL}/auth`,
                method: "POST",
                body: data,
            }),
        }),
        register: builder.mutation({
            query: data => ({
                url: `${USER_URL}/`,
                method: "POST",
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USER_URL}/logout`,
                method: "POST",
            }),
        }),
        updateUser: builder.mutation({
            query: data => ({
                url: `${USER_URL}/home`,
                method: "PUT",
                body: data,
            }),
        }),
        adminLogin: builder.mutation({
            query: data => ({
                url: `${ADMIN_URL}/auth`,
                method: "POST",
                body: data,
            }),
        }),
        adminLogout: builder.mutation({
            query: () => ({
                url: `${ADMIN_URL}/logout`,
                method: "POST",
            }),
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateUserMutation, useAdminLoginMutation,useAdminLogoutMutation } = userApiSlice;
