import React from "react";

const EmailField = ({ email, action }) => {
    return (
        <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
                type="email"
                className="input validator"
                placeholder="Email"
                value={email}
                onChange={action}
                required
            />
            <p className="validator-hint hidden">Required</p>
        </fieldset>
    );
};

export default EmailField;
