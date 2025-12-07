import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";

const NavUser = () => {
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
            console.log(err);
        }
    };
    return (
        <div className="dropdown dropdown-end">
            {userInfo ? (
                <>
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <NavLink className="justify-between" to="/profile">
                                Profile
                                <span className="badge">New</span>
                            </NavLink>
                        </li>
                        <li>
                            <a>Settings</a>
                        </li>
                        <li>
                            <NavLink onClick={logoutHandler}>Logout</NavLink>
                        </li>
                    </ul>
                </>
            ) : (
                <>
                    <NavLink to="/login">Login</NavLink>
                </>
            )}
        </div>
    );
};

export default NavUser;
