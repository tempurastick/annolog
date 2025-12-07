import React from "react";

const SelectField = () => {
    return (
        <select
            defaultValue="Pick a color"
            className="select"
            id="selectIDlater"
        >
            <option disabled={true}>Pick a color</option>
            <option>Crimson</option>
            <option>Amber</option>
            <option>Velvet</option>
        </select>
    );
};

export default SelectField;
