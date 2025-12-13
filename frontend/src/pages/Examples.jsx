import React from "react";

import GoalList from "../components/goals/GoalList";
import ImgList from "../components/list/ImgList";
import Gallery from "../components/gallery/Gallery";
import DatePicker from "../components/Calendar/DatePicker";
import YearGrid from "../components/Calendar/YearGrid";
import YearHeatMap from "../components/Charts/YearHeatMap";
import SearchMovie from "../components/movies/SearchMovie";
import AddMovie from "../components/movies/AddMovie";
import Watchlist from "../components/movies/Watchlist";
const Examples = () => {
    return (
        <>
            <div className="flex flex-col gap-4">
                <h1>AnnoLog</h1>
                {/* <div
                    class="relative bg-base-100 p-10 border border-base-content/10 rounded-box"
                    data-theme="nord"
                >
                    <div class="badge badge-xs absolute end-2 top-2">
                        nord theme
                    </div>{" "}
                    <div class="text-base-content">text-base-content</div>{" "}
                    <div class="text-base-content/70">text-base-content/70</div>{" "}
                    <div class="text-base-content/50">text-base-content/50</div>{" "}
                    <div class="text-base-content/30">text-base-content/30</div>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button className="btn btn-neutral">Neutral</button>
                    <button className="btn btn-primary">Primary</button>
                    <button className="btn btn-secondary">Secondary</button>
                    <button className="btn btn-accent">Accent</button>
                    <button className="btn btn-info">Info</button>
                    <button className="btn btn-success">Success</button>
                    <button className="btn btn-warning">Warning</button>
                    <button className="btn btn-error">Error</button>
                </div> */}

                <Watchlist />
                <AddMovie />
                <GoalList />
                <ImgList />
                <Gallery />
                <DatePicker />

                {/* <YearHeatMap /> */}
            </div>
        </>
    );
};

export default Examples;
