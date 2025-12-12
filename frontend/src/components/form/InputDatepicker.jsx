import { useState, useId, useEffect, useRef } from "react";
import { DayPicker } from "react-day-picker";
import { format, isValid, parse } from "date-fns";
const InputDatepicker = ({ value, onChange }) => {
    const inputId = useId();
    const wrapperRef = useRef(null);

    const [inputValue, setInputValue] = useState(value || "");
    const [selectedDate, setSelectedDate] = useState(
        value ? parse(value, "dd/MM/yyyy", new Date()) : undefined
    );
    const [month, setMonth] = useState(selectedDate || new Date());
    const [visibility, setVisibility] = useState(false);

    // 🔵 keep parent in sync when value changes externally
    useEffect(() => {
        if (value !== inputValue) {
            setInputValue(value || "");
            if (value) {
                const parsed = parse(value, "dd/MM/yyyy", new Date());
                if (isValid(parsed)) {
                    setSelectedDate(parsed);
                    setMonth(parsed);
                }
            }
        }
    }, [value]);

    const handleDayPickerSelect = (date) => {
        if (!date) return;

        const formatted = format(date, "dd/MM/yyyy");

        setSelectedDate(date);
        setInputValue(formatted);
        setMonth(date);
        setVisibility(false);

        // 🔵 send only VALID formatted date to parent
        onChange(formatted);
    };

    const handleInputChange = (e) => {
        const text = e.target.value;
        setInputValue(text);

        const parsed = parse(text, "dd/MM/yyyy", new Date());

        if (isValid(parsed)) {
            setSelectedDate(parsed);
            setMonth(parsed);

            // 🔵 only send formatted VALID date to parent
            onChange(format(parsed, "dd/MM/yyyy"));
        }
    };

    // close when clicking outside
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

    return (
        <fieldset className="fieldset" ref={wrapperRef}>
            <legend className="fieldset-legend">
                <label htmlFor={inputId} className="label">
                    Watched on
                </label>
            </legend>

            <input
                id={inputId}
                className="input"
                type="text"
                placeholder="dd/MM/yyyy"
                value={inputValue}
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
