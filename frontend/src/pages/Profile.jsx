import React from "react";

import { useState } from "react";
import { useSelector } from "react-redux";
import EditProfile from "../components/profile/EditProfile";

const Profile = () => {
    const [edit, setEdit] = useState("");
    const { userInfo } = useSelector((state) => state.auth);

    return (
        <>
            <h2>Profile</h2>

            <div className="bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <div className="avatar avatar-placeholder">
                    <div className="bg-neutral text-neutral-content w-24 rounded-full">
                        <span className="text-3xl">D</span>
                    </div>
                </div>
                <h3>Username</h3>
                <p>{userInfo.name}</p>
                <h3>Email</h3>
                <p>{userInfo.email}</p>
                <button
                    className="btn btn-neutral mt-4"
                    onClick={() => setEdit(!edit)}
                >
                    Edit Profile
                </button>
            </div>
            {edit ? (
                <></>
            ) : (
                <>
                    <EditProfile />
                </>
            )}
        </>
    );
};

export default Profile;
