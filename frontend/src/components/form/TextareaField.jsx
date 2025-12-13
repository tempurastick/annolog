import React from "react";

const TextareaField = ({ name, value, onChange }) => {
    return (
        <>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">{name}</legend>
                <textarea
                    className="textarea h-24 w-full"
                    placeholder="Insert text here..."
                    value={value}
                    id={name}
                    onChange={onChange}
                ></textarea>
                <div className="label">Optional</div>
            </fieldset>
        </>
    );
};

export default TextareaField;
