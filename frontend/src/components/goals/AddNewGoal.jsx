import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Modal from "../Modal/Modal";
import TextInput from "../form/TextInput";
import { useAddGoalMutation } from "../../slices/goalsApiSlice";
import { toast } from "react-toastify";
const AddNewGoal = ({ btnClass = "" }) => {
    const [goal, setGoal] = useState("");
    const addGoalEl = "addGoalEl";

    const [addGoal, { isLoading }] = useAddGoalMutation();

    const onGoalSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await addGoal({
                text: goal,
            }).unwrap();

            //    dispatch(setGoal({ ...res }));
        } catch (err) {
            toast.error(err?.data?.msg);
        } finally {
            toast.success("Added goal");
            setGoal("");
        }
    };

    return (
        <>
            <a
                role="button"
                className={btnClass}
                onClick={() => document.getElementById(addGoalEl).showModal()}
            >
                Add Goal
            </a>
            <Modal modalEl={addGoalEl}>
                <h3>Add Goal</h3>
                <form onSubmit={onGoalSubmit}>
                    <TextInput
                        name="Goal"
                        value={goal}
                        setValue={(e) => setGoal(e.target.value)}
                    >
                        <button className="btn" type="submit">
                            <FaPlus />
                            Add
                        </button>
                    </TextInput>
                </form>
            </Modal>
        </>
    );
};

export default AddNewGoal;
