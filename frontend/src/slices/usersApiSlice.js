import { apiSlice } from "./apiSlice";

const USERS_URL = "/api/users";

export const usersApiSplice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: "POST",
                body: data,
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: "POST",
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: "POST",
            }),
        }),
    }),
});

// convention for POST request is to name it actionMutation
// for GET it's actionQuery
export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
    usersApiSplice;
