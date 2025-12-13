import React from "react";
import {
    useUpdateGoalMutation,
    useRemoveGoalMutation,
} from "../../slices/goalsApiSlice";
import { useState, useEffect } from "react";

import { toast } from "react-toastify";
import { CgClose } from "react-icons/cg";

const GoalCard = ({ goal }) => {
    const [status, setStatus] = useState("");
    const [checked, setChecked] = useState("");

    const [updateGoal] = useUpdateGoalMutation();
    const [deleteGoal, { isLoading }] = useRemoveGoalMutation();
    const createdAt = new Date(goal.createdAt).toLocaleDateString();

    useEffect(() => {
        const isCompleted = goal.status == "Completed" ? true : false;
        setChecked(isCompleted);
        setStatus(goal.status); // getting current status from the goal and setting it
    }, [goal.status]);

    const handleChecked = async (e) => {
        const isChecked = e.target.checked;
        e.target.disabled = true;
        if (isChecked) {
            // while we're processing this we're disabling input

            try {
                const res = await updateGoal({
                    _id: goal._id,
                    status: "Completed",
                }).unwrap();
                setChecked(true);
                setStatus("Completed");
            } catch (err) {
                toast.error(err?.data?.msg);
            } finally {
                e.target.disabled = false;
            }
        }
    };

    const unCheck = async (e) => {
        e.target.disabled = true;

        try {
            const res = await updateGoal({
                _id: goal._id,
                status: "Incomplete",
            }).unwrap();
            setChecked(false);
            setStatus("Incomplete");
        } catch (err) {
            toast.error(err?.data?.msg);
        } finally {
            e.target.disabled = false;
        }
    };

    const handleDeleteGoal = async (e) => {
        try {
            const res = await deleteGoal({
                _id: goal._id,
            }).unwrap();
        } catch (err) {
            toast.error(err?.data?.msg || err.error);
        }
    };

    return (
        <div className="card bg-base-200 card-sm mb-2 shadow-sm w-full sm:max-w-[calc(50%-0.5rem)]">
            <div className="card-body">
                <div className="card-body-inner flex flex-row">
                    <button
                        className="btn btn-circle btn-sm  btn-soft btn-error absolute top-1.5 right-3"
                        onClick={(e) => handleDeleteGoal(e)}
                    >
                        <CgClose />
                    </button>
                    <div className="card-actions pr-4">
                        {status == "Completed" ? (
                            <>
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-primary"
                                    onChange={(e) => unCheck(e)}
                                    checked={checked}
                                />
                            </>
                        ) : (
                            <>
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-primary"
                                    onChange={(e) => handleChecked(e)}
                                    checked={checked}
                                />
                            </>
                        )}
                    </div>
                    <h2 className="justify-self-end card-title text-xs uppercase font-semibold">
                        {goal.text}
                    </h2>
                </div>

                <div className="card-footer flex justify-between">
                    {/* category? would this need to be a separate collection to cross reference... hm */}
                    <div className="badge badge-soft badge-primary">
                        {status}
                    </div>
                    {/*  created at */}
                    <span className="badge badge-sm opacity-60">
                        {createdAt}
                    </span>
                    {/* finished at (if applicable) - change data here later  */}
                    {/* <span className="badge badge-sm">{goal.updatedAt}</span> */}
                </div>
            </div>
        </div>
    );
};

export default GoalCard;
