import React from "react";

const EmailField = ({ email, name, action, required = true }) => {
    return (
        <fieldset className="fieldset">
            <legend className="label">Email</legend>
            {required ? (
                <>
                    <input
                        type="email"
                        className="input validator"
                        placeholder="Email"
                        value={email}
                        name={name}
                        onChange={action}
                        required
                    />
                    <p className="validator-hint hidden">Required</p>
                </>
            ) : (
                <>
                    <input
                        type="email"
                        className="input validator"
                        placeholder="Email"
                        value={email}
                        name={name}
                        onChange={action}
                    />
                </>
            )}
        </fieldset>
    );
};

export default EmailField;
