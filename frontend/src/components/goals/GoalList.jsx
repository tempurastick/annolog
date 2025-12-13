import React from "react";

import { useState, useEffect } from "react";
import GoalCard from "./GoalCard";
import AddNewGoal from "./AddNewGoal";
import { useGetGoalsQuery } from "../../slices/goalsApiSlice";

const GoalList = () => {
    const { data: goals, isLoading, isError } = useGetGoalsQuery();

    if (goals?.length == 0) {
        return (
            <>
                <div className="p-4  w-full sm:max-w-3/4 mx-auto">
                    <h2 className="text-xl">Goals</h2>
                    <p>Get started by adding a goal:</p>
                    <br />
                    <AddNewGoal btnClass="btn btn-primary w-fit" />
                </div>
            </>
        );
    }

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
            <h2 className="text-xl px-4 mt-8 mb-4 md:mx-auto w-full sm:max-w-3/4">
                Goals
            </h2>
            <div className="flex flex-wrap justify-between mx-4 sm:w-full gap-2 sm:mx-auto sm:max-w-3/4">
                {goals.map((goal) => (
                    <GoalCard goal={goal} key={goal._id} />
                ))}
            </div>
        </>
    );
};

export default GoalList;
