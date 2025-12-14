import React from "react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EmailField from "../form/EmailField";
import TextareaField from "../form/TextareaField";
import UserNameField from "../form/UserNameField";
import { useUpdateMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";

const EditProfile = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [bio, setBio] = useState(""); // should throttle this in the future

    const [updateProfile, { isLoading }] = useUpdateMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);

    const btnClass = isLoading
        ? "btn btn-neutral mt-4 btn-disabled"
        : "btn btn-neutral mt-4";

    const submitUserName = async (e) => {
        e.preventDefault();

        try {
            const res = await updateProfile({
                _id: userInfo._id,
                name,
                email,
                bio,
            }).unwrap(); // unwraps promise
            dispatch(setCredentials(res));
            navigate("/");
        } catch (err) {
            toast.error(err?.data?.msg);
        }
    };

    return (
        <>
            <form className="fieldset p-4" onSubmit={submitUserName}>
                <UserNameField
                    required={false}
                    value={name}
                    name="username"
                    action={(e) => setName(e.target.value)}
                />

                <EmailField
                    email={email}
                    name="email"
                    required={false}
                    action={(e) => {
                        setEmail(e.target.value);
                    }}
                />

                <TextareaField
                    value={bio}
                    name="bio"
                    onChange={(e) => setBio(e.target.value)}
                />
                <button className={btnClass} type="submit">
                    {isLoading ? (
                        <>
                            <span className="loading loading-dots loading-xs"></span>
                        </>
                    ) : (
                        <>Update Profile</>
                    )}
                </button>
            </form>
        </>
    );
};

export default EditProfile;
