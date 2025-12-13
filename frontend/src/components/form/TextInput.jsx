import React from "react";

const TextInput = ({ name, value, setValue, optional = false, children }) => {
    return (
        <fieldset className="fieldset flex">
            <legend className="fieldset-legend">{name}</legend>

            {optional ? (
                <>
                    <input
                        type="text"
                        className="input"
                        placeholder="Type here"
                        id={name}
                        value={value}
                        onChange={setValue}
                    />
                    <p className="label">Optional</p>
                </>
            ) : (
                <>
                    <>
                        <input
                            type="text"
                            className="input"
                            placeholder="Type here"
                            id={name}
                            value={value}
                            onChange={setValue}
                            required
                        />
                    </>
                </>
            )}
            {children}
        </fieldset>
    );
};

export default TextInput;
