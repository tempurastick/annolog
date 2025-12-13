import React from "react";

import { useState, useEffect } from "react";
import GoalCard from "./GoalCard";
import AddNewGoal from "./AddNewGoal";
import { useGetGoalsQuery } from "../../slices/goalsApiSlice";

const GoalList = () => {
    const { data: goals, isLoading, isError } = useGetGoalsQuery();

    // TODO: create layout for error
    if (isError) {
        return <div>Error</div>;
    }

    if (isLoading) {
        return (
            <>
                <div className="flex flex-wrap gap-2">
                    <div className="skeleton h-24 w-xs"></div>
                    <div className="skeleton h-24 w-xs"></div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="flex flex-wrap w-full justify-between w-full gap-2 mx-auto sm:max-w-3/4">
                {goals.map((goal) => (
                    <GoalCard goal={goal} key={goal._id} />
                ))}
            </div>
        </>
    );
};

export default GoalList;
