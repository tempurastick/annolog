import { useState } from "react";

const RatingField = ({ name, value, onChange }) => {
    //  could probably just make the whole input thing a loop but for now this will do
    const handleRatingSubmit = (e) => {
        onChange(Number(e.target.value));
    };

    return (
        <>
            <fieldset className="fieldset">
                <legend className="fieldset-legend text-base-content/50">
                    Rating
                </legend>
                <div className="rating">
                    <input
                        type="radio"
                        name={`rating-${name}`}
                        className="rating-hidden"
                        aria-label="clear"
                        value={(value = 0)}
                    />
                    <input
                        type="radio"
                        name={`rating-${name}`}
                        className="mask mask-star-2 bg-primary"
                        aria-label="1 star"
                        onChange={(e) => handleRatingSubmit(e)}
                        value={(value = 1)}
                        defaultChecked
                    />
                    <input
                        type="radio"
                        name={`rating-${name}`}
                        className="mask mask-star-2 bg-primary"
                        aria-label="2 star"
                        onChange={(e) => handleRatingSubmit(e)}
                        value={(value = 2)}
                    />
                    <input
                        type="radio"
                        name={`rating-${name}`}
                        className="mask mask-star-2 bg-primary"
                        aria-label="3 star"
                        onChange={(e) => handleRatingSubmit(e)}
                        value={(value = 3)}
                    />
                    <input
                        type="radio"
                        name={`rating-${name}`}
                        className="mask mask-star-2 bg-primary"
                        aria-label="4 star"
                        onChange={(e) => handleRatingSubmit(e)}
                        value={(value = 4)}
                    />
                    <input
                        type="radio"
                        name={`rating-${name}`}
                        className="mask mask-star-2 bg-primary"
                        aria-label="5 star"
                        onChange={(e) => handleRatingSubmit(e)}
                        value={(value = 5)}
                    />
                </div>
                <p className="label">Optional</p>
            </fieldset>
        </>
    );
};

export default RatingField;
