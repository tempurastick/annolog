import React from "react";

import { useState, useEffect } from "react";
import GoalCard from "./GoalCard";
import AddNewGoal from "./AddNewGoal";
import { useGetGoalsQuery } from "../../slices/goalsApiSlice";

const GoalList = () => {
    const { data: goals, isLoading, isError } = useGetGoalsQuery();

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
            <div className="flex flex-wrap gap-2">
                {goals.map((goal) => (
                    <GoalCard goal={goal} key={goal.id} />
                ))}
                <AddNewGoal />
            </div>
        </>
    );
};

export default GoalList;
