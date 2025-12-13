import React from "react";

const YearHeatMap = () => {
    // make received month dynamic later
    const currentYear = new Date().getFullYear();
    const daysInMonth = (month) => {
        return new Date(currentYear, month, 0).getDate();
    };

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    let yearMap = [];

    const grid = [];
    // replace fixed width later
    months.forEach((month, index) => {
        grid.push(
            <div key={index} className="w-[45px] text-center">
                <h2>{month[0]}</h2>
            </div>
        );
        let days = daysInMonth(index + 1);

        // creates a rect container for each day in the month
        const daysContainer = [];
        for (let i = 0; i < days; i++) {
            // for matching the data later
            //const currentDate = new Date(currentYear, index, i + 1);
            // YYYY - MM - DD
            const currentDate = `${currentYear}-${(index + 1)
                .toString()
                .padStart(2, "0")}-${i + 1}`;
            daysContainer.push(
                <div
                    index={`${month}-${i + 1}`}
                    className="w-[45px]"
                    data-day={currentDate}
                >
                    <svg
                        width="40"
                        height="40"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            width="40"
                            height="40"
                            rx="10"
                            ry="10"
                            fill="var(--color-primary)"
                        />
                    </svg>
                </div>
            );
        }

        yearMap.push(
            <div className="flex flex-col gap-1">{daysContainer}</div>
        );
    });

    return (
        <>
            <div className="calendarGrid flex">
                <div className="days-index flex flex-col">
                    <div className="h-[35px]"></div>
                    <div className="h-[45px]">1</div>
                    <div className="h-[45px]">2</div>
                    <div className="h-[45px]">3</div>
                </div>
                <div className="calendarGrid_content">
                    <div className="months flex">{grid}</div>
                    <div className="days flex">{yearMap}</div>
                </div>
            </div>
        </>
    );
};

export default YearHeatMap;
