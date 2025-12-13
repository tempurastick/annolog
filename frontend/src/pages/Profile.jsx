import React from "react";

import { useState } from "react";
import { useSelector } from "react-redux";
import EditProfile from "../components/profile/EditProfile";

const Profile = () => {
    const [edit, setEdit] = useState(true);
    const { userInfo } = useSelector((state) => state.auth);
    const labelClasses = "join-item text-right text-sm mr-2 opacity-60 w-20";

    return (
        <>
            <h1 className="text-2xl px-4 my-4 md:mx-auto w-full sm:max-w-3/4">
                Profile
            </h1>

            <div className="bg-base-200 border-base-300 rounded-box mx-auto p-4 sm:w-full sm:max-w-3/4">
                <div className="avatar avatar-placeholder">
                    <div className="bg-neutral text-neutral-content w-24 rounded-full">
                        <span className="text-3xl">
                            {userInfo.name.slice(0, 2)}
                        </span>
                    </div>
                </div>
                <ul className="list mt-4">
                    <li className="join">
                        <p className={labelClasses}>Username:</p>
                        <p className="join-item text-sm"> {userInfo.name}</p>
                    </li>
                    <li className="join">
                        <p className={labelClasses}>E-mail:</p>
                        <p className="join-item text-sm"> {userInfo.email}</p>
                    </li>
                    <li className="join">
                        <p className={labelClasses}>Bio:</p>
                        <p className="join-item text-sm h-24">
                            {" "}
                            {userInfo.bio}{" "}
                        </p>
                    </li>
                </ul>

                <button
                    className="btn btn-neutral mt-4"
                    value={edit}
                    onClick={() => setEdit(!edit)}
                >
                    Edit Profile
                </button>

                {edit ? (
                    <></>
                ) : (
                    <>
                        <EditProfile />
                    </>
                )}
            </div>
        </>
    );
};

export default Profile;
