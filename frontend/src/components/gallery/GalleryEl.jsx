import React from "react";

const GalleryEl = () => {
    return (
        <div className="max-w-1/2 md:max-w-1/4 py-2 px-0.5 md:px-2">
            <figure>
                {/*  include magnifier later */}
                <img src="https://placehold.co/600x400" />
                {/*  optional desc for image */}
                <figcaption>Image Desc.</figcaption>
            </figure>
        </div>
    );
};

export default GalleryEl;
