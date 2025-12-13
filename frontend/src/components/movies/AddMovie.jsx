import React, { useState } from "react";
import SearchMovie from "./SearchMovie";
import InputDatepicker from "../form/InputDatepicker";
import RatingField from "../form/RatingField";
import { FaPlus } from "react-icons/fa";
import TextareaField from "../form/TextareaField";
import { toast } from "react-toastify";
import Modal from "../Modal/Modal";
import { useAddWatchlistMutation } from "../../slices/watchlistsApiSlice";
const AddMovie = () => {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [review, setReview] = useState("");
    const [watchedOn, setWatchedOn] = useState("");
    const [rating, setRating] = useState(0);
    const [rewatch, setRewatch] = useState(false);

    const [addToWatchlist] = useAddWatchlistMutation();
    const addMovieEl = "addMovieEl";

    const onMovieSubmit = async (e) => {
        e.preventDefault();

        const movie = {
            tmdbId: selectedMovie.tmdbId,
            poster: selectedMovie.poster,
            releaseDate: selectedMovie.releaseDate,
            title: selectedMovie.title,
        };

        try {
            // adding movie and watchlist on the backend
            const res = await addToWatchlist({
                movie,
                review,
                rating,
                watchedOn,
                rewatch,
            }).unwrap();
        } catch (err) {
            toast.error(err?.data?.msg);
        } finally {
            toast.success("Added movie");
        }
    };

    return (
        <>
            <a
                role="button"
                className=""
                onClick={() => document.getElementById(addMovieEl).showModal()}
            >
                Add Movie
            </a>

            <Modal modalEl={addMovieEl}>
                <h3>Add Movie</h3>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                    <legend className="fieldset-legend">Add Movie </legend>
                    <form onSubmit={(e) => onMovieSubmit(e)}>
                        <SearchMovie onSelectMovie={setSelectedMovie} />
                        <InputDatepicker
                            value={watchedOn}
                            onChange={setWatchedOn}
                        />
                        <TextareaField
                            name={"Review"}
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        />
                        <RatingField
                            name={"movie"}
                            value={rating}
                            onChange={setRating}
                        />
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Rewatch</legend>
                            <label className="label">
                                <input
                                    type="checkbox"
                                    checked={rewatch}
                                    name="Rewatch"
                                    onChange={(e) => {
                                        setRewatch(e.target.checked);
                                    }}
                                    className="checkbox"
                                />
                                I have seen it before
                            </label>
                        </fieldset>

                        <button className="btn btn-primary mt-4" type="submit">
                            <FaPlus />
                            Add Movie
                        </button>
                    </form>
                </fieldset>
            </Modal>
        </>
    );
};

export default AddMovie;
