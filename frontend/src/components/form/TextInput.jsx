import React from "react";

const TextInput = () => {
    return (
        <fieldset className="fieldset">
            <legend className="fieldset-legend">What is your name?</legend>
            <input
                type="text"
                className="input"
                placeholder="Type here"
                id="later"
            />
            <p className="label">Optional</p>
        </fieldset>
    );
};

export default TextInput;
