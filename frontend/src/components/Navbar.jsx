import React from "react";
import { FiHome, FiUser, FiLogOut, FiLogIn, FiPlus } from "react-icons/fi";

import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import AddNewGoal from "./goals/AddNewGoal";
import AddMovie from "./movies/AddMovie";
import { toast } from "react-toastify";
const Navbar = () => {
    const { userInfo } = useSelector((state) => state.auth);

    const [logoutApiCall] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate("/login");
        } catch (err) {
            toast.error(err?.data?.msg || err.error);
        }
    };
    return (
        <>
            <div className="w-full md:w-fit bg-base-200 rounded-box h-fit md:self-center flex justify-center fixed bottom-0 md:static">
                <ul className="menu menu-horizontal md:menu-vertical">
                    <li>
                        <NavLink to="/">
                            <FiHome className="size-6 sm:size-4" />
                            <span className="sr-only sm:not-sr-only">
                                Homepage
                            </span>
                        </NavLink>
                    </li>

                    {userInfo ? (
                        <>
                            <li>
                                <NavLink to="/profile">
                                    <FiUser className="size-6 sm:size-4" />
                                    <span className="sr-only sm:not-sr-only">
                                        Profile
                                    </span>
                                </NavLink>
                            </li>
                            <li>
                                <button
                                    className="reset"
                                    popoverTarget="popover-1"
                                    style={{
                                        anchorName: "--anchor-1",
                                    }}
                                >
                                    <FiPlus className="size-6 sm:size-4" />
                                    <span className="sr-only sm:not-sr-only">
                                        Add new
                                    </span>
                                </button>
                                <ul
                                    className="dropdown menu rounded-box bg-base-300 shadow-sm"
                                    // className="menu-sublist"
                                    popover="auto"
                                    id="popover-1"
                                    style={{
                                        top: "-160px",
                                        positionAnchor: "--anchor-1",
                                    }}
                                >
                                    <li>
                                        <AddNewGoal className="size-6 sm:size-4" />
                                    </li>
                                    <li>
                                        <AddMovie className="size-6 sm:size-4" />
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <NavLink onClick={logoutHandler}>
                                    <FiLogOut className="size-6 sm:size-4" />
                                    <span className="sr-only sm:not-sr-only">
                                        Logout
                                    </span>
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink to="/login">
                                    <FiLogIn className="size-6 sm:size-4" />
                                    <span className="sr-only sm:not-sr-only">
                                        Login
                                    </span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/register">
                                    <FiUser className="size-6 sm:size-4" />
                                    <span className="sr-only sm:not-sr-only">
                                        Register
                                    </span>
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </>
    );
};

export default Navbar;
