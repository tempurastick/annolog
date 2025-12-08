import React from "react";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EmailField from "../form/EmailField";
import PasswordField from "../form/PasswordField";
import UserNameField from "../form/UserNameField";
import { useUpdateMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";

const EditProfile = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [updateProfile, { isLoading }] = useUpdateMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [userInfo.name, userInfo.email]);

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
                password,
            }).unwrap(); // unwraps promise
            console.log(res);
            dispatch(setCredentials(res));
            navigate("/");
        } catch (err) {
            toast.error(err?.data?.msg);
        }
    };

    return (
        <>
            <form
                className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
                onSubmit={submitUserName}
            >
                <UserNameField
                    value={name}
                    action={(e) => setName(e.target.value)}
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
            <EmailField
                email={email}
                action={(e) => {
                    setEmail(e.target.value);
                }}
            />
            <PasswordField
                name="Password"
                password={password}
                action={(e) => setPassword(e.target.value)}
            />
            <PasswordField
                name="Confirm Password"
                confirmPassword={password}
                action={(e) => setConfirmPassword(e.target.value)}
            />
        </>
    );
};

export default EditProfile;
