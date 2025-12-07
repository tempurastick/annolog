import React from "react";

const PasswordField = ({ value, name, action }) => {
    return (
        <label className="fieldset">
            <span className="label">{name}</span>
            <input
                type="password"
                className="input validator"
                placeholder={name}
                value={value}
                onChange={action}
                required
            />
            <span className="validator-hint hidden">Required</span>
        </label>
    );
};

export default PasswordField;
