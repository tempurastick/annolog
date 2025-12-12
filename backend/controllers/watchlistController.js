import { Watchlist } from "../model/watchlistModel.js";
import { Movie } from "../model/movieModel.js";
import { User } from "../model/userModel.js";
import checkUser from "../middleware/checkUser.js";

// @desc Get all movies in the watchlist of a user
// @route GET /api/watchlist
export const getWatchlists = async (req, res, next) => {
    const watchlist = await Watchlist.find({ user: req.user.id });
    // get watchlist of current user
    res.status(200).json(watchlist);
};

// @desc create watchlist - user enters a movie into their log
// @route POST /api/watchlist
export const createWatchlist = async (req, res, next) => {
    const { movie, review, rating, watchedOn, rewatch } = await req.body;
    let movieId = movie.tmdbId;

    let dbMovie = await Movie.findOne({ tmdbId: movieId });

    if (!dbMovie) {
        // adding to the movie collection
        dbMovie = await Movie.create({
            tmdbId: movie.tmdbId,
            poster: movie.poster,
            releaseDate: movie.releaseDate,
            title: movie.title,
        });
    }

    const existingWatchlist = await Watchlist.findOne({ movie: dbMovie });

    if (existingWatchlist && rewatch == false) {
        const error = new Error(
            "This movie is already on your watchlist. Did you forget to check rewatch?"
        );
        error.status = 400;
        return next(error);
    } else {
        const newWatchlist = await Watchlist.create({
            movie: dbMovie._id,
            user: req.user._id,
            rating,
            review,
            watchDate: watchedOn,
            rewatch,
        });

        res.status(200).json(newWatchlist);
    }
};

// @desc delete watchlist ( logged movie entry )
// @route DELETE /api/watchlist/:id
export const deleteWatchlist = async (req, res, next) => {
    const watchlist = await Watchlist.find({ user: req.user.id });

    if (!watchlist) {
        const error = new Error(
            `A watchlist with the id of ${req.params.id} was not found.`
        );
        error.status = 404;
        return next(error);
    }

    const user = await User.findById(req.user.id);

    checkUser(watchlist, user, next);

    res.status(200).json({ id: req.params.id });
};

// @desc update watchlist
// @route PUT /api/watchlist/:id
// the one that will probably be used the most
export const updateWatchlist = async (req, res, next) => {
    const watchlist = await Watchlist.find({ user: req.user.id });

    if (!watchlist) {
        const error = new Error(
            `A watchlist with the id of ${req.params.id} was not found. Have you created your watchlist?`
        );
        error.status = 404;
        return next(error);
    }

    const user = await User.findById(req.user.id);

    checkUser(watchlist, user, next);

    const updatedWatchlist = await Watchlist.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        }
    );

    res.status(200).json(updatedWatchlist);
};
