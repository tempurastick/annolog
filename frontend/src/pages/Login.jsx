import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EmailField from "../components/form/EmailField";
import PasswordField from "../components/form/PasswordField";
import Validator from "../components/form/Validator";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();

    // get user data from state
    const { userInfo } = useSelector((state) => state.auth);

    const btnClass = isLoading
        ? "btn btn-neutral mt-4 btn-disabled"
        : "btn btn-neutral mt-4";

    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({
                email,
                password,
            }).unwrap(); // unwraps promise

            dispatch(setCredentials({ ...res }));
            navigate("/");
        } catch (err) {
            toast.error(err?.data?.msg || err.error);
            console.log(err?.data?.msg || err.error); // data.msg is the error from our backend that we set
        }
    };

    const resetForm = () => {
        setEmail("");
        setPassword("");
    };

    return (
        <>
            <form
                className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
                onSubmit={submitHandler}
            >
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

                <button className={btnClass} type="submit">
                    {isLoading ? (
                        <>
                            <span className="loading loading-dots loading-xs"></span>
                        </>
                    ) : (
                        <>Login</>
                    )}
                </button>
                <button
                    className="btn btn-ghost mt-1"
                    type="reset"
                    onClick={resetForm}
                >
                    Reset
                </button>
            </form>
        </>
    );
};

export default Login;
