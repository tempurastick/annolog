import React from "react";

import { useState } from "react";
import { DayPicker } from "react-day-picker";

const DatePicker = () => {
    const [selected, setSelected] = useState(new Date());

    return (
        <DayPicker
            className="react-day-picker"
            animate
            mode="single"
            selected={selected}
            onSelect={setSelected}
            footer={
                selected
                    ? `Selected: ${selected.toLocaleDateString()}`
                    : "Pick a day."
            }
        />
    );
};

export default DatePicker;
