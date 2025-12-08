import { apiSlice } from "./apiSlice";

const GOALS_URL = "/api/goals";

export const goalsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getGoals: builder.query({
            query: () => `${GOALS_URL}`,
            providesTags: ["Goals"],
        }),
        addGoal: builder.mutation({
            query: (data) => ({
                url: `${GOALS_URL}`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Goals"],
        }),
        removeGoal: builder.mutation({
            query: (data) => ({
                url: `${GOALS_URL}/${data._id}`,
                method: "DELETE",
                body: data,
            }),
            invalidatesTags: ["Goals"],
        }),
        updateGoal: builder.mutation({
            query: (data) => ({
                url: `${GOALS_URL}/${data._id}`,
                method: "PUT",
                body: data,
            }),
        }),
    }),
});

export const {
    useGetGoalsQuery,
    useAddGoalMutation,
    useRemoveGoalMutation,
    useUpdateGoalMutation,
} = goalsApiSlice;
