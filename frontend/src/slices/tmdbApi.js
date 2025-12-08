import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tmdbApi = createApi({
    reducerPath: "tmdbApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.themoviedb.org/3/",
        prepareHeaders: (headers) => {
            headers.set(
                "Authorization",
                `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
            );
            return headers;
        },
    }),
    endpoints: (builder) => ({
        searchMovies: builder.query({
            query: (query) => `search/movie?query=${encodeURIComponent(query)}`,
        }),
        getMovieDetails: builder.query({
            query: (id) => `movies/${id}`,
        }),
    }),
});

export const { useSearchMoviesQuery, useGetMovieDetailsQuery } = tmdbApi;
