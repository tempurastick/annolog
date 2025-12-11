import { apiSlice } from "./apiSlice";

const MOVIES_URL = "/api/movies";

export const moviesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMovies: builder.query({
            query: () => `${MOVIES_URL}`,
            providesTags: ["Movies"],
        }),
        addMovie: builder.mutation({
            query: (data) => ({
                url: `${MOVIES_URL}`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Movies"],
        }),
        removeMovie: builder.mutation({
            query: (data) => ({
                url: `${MOVIES_URL}/${data._id}`,
                method: "DELETE",
                body: data,
            }),
            invalidatesTags: ["Movies"],
        }),
        updateMovie: builder.mutation({
            query: (data) => ({
                url: `${MOVIES_URL}/${data._id}`,
                method: "PUT",
                body: data,
            }),
        }),
    }),
});

export const {
    usetGetMoviesQuery,
    useAddMovieMutation,
    useRemoveMovieMutation,
    useUpdateMovieMutation,
} = moviesApiSlice;
