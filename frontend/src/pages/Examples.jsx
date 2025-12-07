import React from "react";

import TextInput from "../components/form/TextInput";
import SelectField from "../components/form/SelectField";
import Validator from "../components/form/Validator";

import GoalCard from "../components/goals/GoalCard";
const Examples = () => {
    return (
        <>
            <div className="flex flex-col gap-4">
                <h1>AnnoLog</h1>
                <TextInput />
                <SelectField />
                <Validator />
                <GoalCard />
            </div>
        </>
    );
};

export default Examples;
