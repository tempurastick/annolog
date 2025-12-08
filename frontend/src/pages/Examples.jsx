import React from "react";

import GoalList from "../components/goals/GoalList";
import ImgList from "../components/list/ImgList";
import Gallery from "../components/gallery/Gallery";
import DatePicker from "../components/Calendar/DatePicker";
import YearGrid from "../components/Calendar/YearGrid";
import YearHeatMap from "../components/Charts/YearHeatMap";
import SearchMovie from "../components/movies/SearchMovie";
const Examples = () => {
    return (
        <>
            <div className="flex flex-col gap-4">
                <h1>AnnoLog</h1>

                <SearchMovie />
                <GoalList />
                <ImgList />
                <Gallery />
                <DatePicker />
                <YearGrid />
                <YearHeatMap />
            </div>
        </>
    );
};

export default Examples;
