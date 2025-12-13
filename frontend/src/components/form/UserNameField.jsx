import React from "react";
import { FiUser } from "react-icons/fi";

const UserNameField = ({ value, name, action, required = true }) => {
    return (
        <>
            <fieldset className="fieldset">
                <legend className="label">Username</legend>
                <label className="input validator">
                    <FiUser className="opacity-60" />
                    {required ? (
                        <>
                            <input
                                type="text"
                                required
                                placeholder="Username"
                                pattern="[A-Za-z][A-Za-z0-9\-]*"
                                minLength="3"
                                maxLength="30"
                                title="Only letters, numbers or dash"
                                value={value}
                                name={name}
                                onChange={action}
                            />
                        </>
                    ) : (
                        <>
                            {" "}
                            <input
                                type="text"
                                placeholder="Username"
                                pattern="[A-Za-z][A-Za-z0-9\-]*"
                                minLength="3"
                                maxLength="30"
                                title="Only letters, numbers or dash"
                                value={value}
                                name={name}
                                onChange={action}
                            />
                        </>
                    )}
                </label>
                <p className="validator-hint">
                    Must be 3 to 30 characters
                    <br />
                    containing only letters, numbers or dash
                </p>
            </fieldset>
        </>
    );
};

export default UserNameField;
