import React from "react";
import { DayPicker } from "react-day-picker";

const YearGrid = () => {
    return (
        <>
            <DayPicker
                captionLayout=""
                className="react-day-picker"
                hideNavigation
                ISOWeek
                month={new Date(2026, 0, 1)}
                navLayout=""
                mode="multiple"
                numberOfMonths={12}
                showOutsideDays
            />
        </>
    );
};

export default YearGrid;
