import React from "react";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EmailField from "../components/form/EmailField";
import PasswordField from "../components/form/PasswordField";
import UserNameField from "../components/form/UserNameField";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
const Register = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const [register, { isLoading }] = useRegisterMutation();

    // change to profile page later
    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [navigate, userInfo]);
    // get user data from state

    const btnClass = isLoading
        ? "btn btn-neutral mt-4 btn-disabled"
        : "btn btn-neutral mt-4";

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
        } else {
            try {
                const res = await register({
                    name,
                    email,
                    password,
                }).unwrap(); // unwraps promise

                dispatch(setCredentials({ ...res }));
                navigate("/");
            } catch (err) {
                toast.error(err?.data?.msg);
            }
        }
    };
    return (
        <>
            <div className="flex flex-col h-full justify-center md:mx-auto w-full sm:max-w-3/4">
                <h2>Register</h2>
                <form
                    className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
                    onSubmit={submitHandler}
                >
                    <UserNameField
                        value={name}
                        action={(e) => setName(e.target.value)}
                    />
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

                    <button className={btnClass} type="submit">
                        {isLoading ? (
                            <>
                                <span className="loading loading-dots loading-xs"></span>
                            </>
                        ) : (
                            <>Register</>
                        )}
                    </button>
                </form>
            </div>
        </>
    );
};

export default Register;
