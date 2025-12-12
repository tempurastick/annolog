import { apiSlice } from "./apiSlice";

const WATCHLIST_URL = "/api/watchlists";

export const watchlistsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getWatchlists: builder.query({
            query: () => `${WATCHLIST_URL}`,
            providesTags: ["Watchlists"],
        }),
        addWatchlist: builder.mutation({
            query: (data) => ({
                url: `${WATCHLIST_URL}`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Watchlists"],
        }),
        removeWatchlist: builder.mutation({
            query: (data) => ({
                url: `${WATCHLIST_URL}/${data._id}`,
                method: "DELETE",
                body: data,
            }),
            invalidatesTags: ["Watchlists"],
        }),
        updateWatchlist: builder.mutation({
            query: (data) => ({
                url: `${WATCHLIST_URL}/${data._id}`,
                method: "PUT",
                body: data,
            }),
        }),
    }),
});

export const {
    useGetWatchlistsQuery,
    useAddWatchlistMutation,
    useRemoveWatchlistMutation,
    useUpdateWatchlistMutation,
} = watchlistsApiSlice;
