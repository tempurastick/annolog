import React from "react";
import { FiHome, FiUser, FiLogOut, FiLogIn } from "react-icons/fi";

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
            navigate("/");
        } catch (err) {
            toast.error(err?.data?.msg || err.error);
        }
    };
    return (
        <>
            <ul className="menu menu-vertical bg-base-200 rounded-box">
                <li>
                    <NavLink to="/">
                        <FiHome />
                        Homepage
                    </NavLink>
                </li>

                {userInfo ? (
                    <>
                        <li>
                            <NavLink to="/profile">
                                <FiUser />
                                Profile
                            </NavLink>
                        </li>
                        <li>
                            <ul className="menu-sublist">
                                <li>
                                    <AddNewGoal />
                                </li>
                                <li>
                                    <AddMovie />
                                </li>
                            </ul>
                        </li>
                        <li>
                            <NavLink onClick={logoutHandler}>
                                <FiLogOut />
                                Logout
                            </NavLink>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <NavLink to="/login">
                                <FiLogIn />
                                Login
                            </NavLink>
                        </li>
                    </>
                )}
            </ul>
        </>
    );
};

export default Navbar;
