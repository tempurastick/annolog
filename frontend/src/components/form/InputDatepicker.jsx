import { useState, useId, useEffect, useRef } from "react";
import { DayPicker } from "react-day-picker";
import { format, isValid, parse } from "date-fns";
const InputDatepicker = ({ value, onChange }) => {
    const inputId = useId();
    const wrapperRef = useRef(null);
    const [month, setMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [visibility, setVisibility] = useState("");

    const handleDayPickerSelect = (date) => {
        if (!date) {
            setInputValue("");
            setSelectedDate("");
        } else {
            setSelectedDate(date);
            setMonth(date);
            setInputValue(format(date, "dd/MM/yyyy"));
            const formattedDate = format(date, "dd/MM/yyyy");
            setVisibility(false);
            onChange(formattedDate);
        }
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setVisibility(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        const parsedDate = parse(e.target.value, "dd/MM/yyyy", new Date());

        if (isValid(parsedDate)) {
            setSelectedDate(parsedDate);
            setMonth(parsedDate);
        } else {
            setSelectedDate("");
        }
    };

    return (
        <fieldset className="fieldset" ref={wrapperRef}>
            <legend className="fieldset-legend">
                <label htmlFor={inputId} className="label">
                    Watched on
                </label>
            </legend>
            <input
                className="input"
                id={inputId}
                type="text"
                value={inputValue}
                placeholder="dd/MM/yyyy"
                onChange={handleInputChange}
                onFocus={() => setVisibility(true)}
                required
            />

            {visibility && (
                <div className="datepicker-popover">
                    <DayPicker
                        className="react-day-picker"
                        month={month}
                        onMonthChange={setMonth}
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDayPickerSelect}
                    />
                </div>
            )}
        </fieldset>
    );
};

export default InputDatepicker;
