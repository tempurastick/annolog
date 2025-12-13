import React from "react";
import GalleryEl from "./GalleryEl";
const Gallery = () => {
    return (
        <div>
            Gallery
            <div className="flex flex-wrap">
                <GalleryEl />
                <GalleryEl />
                <GalleryEl />
                <GalleryEl />
            </div>
        </div>
    );
};

export default Gallery;
