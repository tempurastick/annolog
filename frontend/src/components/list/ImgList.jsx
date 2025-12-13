import React from "react";
import ImgListEL from "./ImgListEl";

//  a listical that can be used for books, films, shows and games
const ImgList = () => {
    return (
        <div className="list bg-base-200 rounded-box shadow-md">
            <ul className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                Title of this list
                <ImgListEL />
            </ul>
        </div>
    );
};

export default ImgList;
