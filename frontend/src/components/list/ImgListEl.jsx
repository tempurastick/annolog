import React from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
const ImgListEL = () => {
    return (
        <li className="list-row">
            <img
                className="max-w-20"
                src="https://placehold.co/140x210"
                alt="film cover"
            />
            <div>
                <div className="text-xs uppercase font-semibold">
                    Film Title
                </div>
                {/* rating system, make dynamic later  */}
                <div className="flex flex-row">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStarHalfAlt />
                    <FaRegStar />
                </div>
                <div>Rewatch </div>
            </div>
            <div>
                <div>(start) Date</div>
                <div>(finish) Date</div>
            </div>
        </li>
    );
};

export default ImgListEL;
