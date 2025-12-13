import mongoose from "mongoose";
const { Schema } = mongoose;

const watchlistSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        movie: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Movie",
        },
        watchDate: {
            type: String,
            required: true,
        },

        rating: {
            type: Number,
            minimum: 0,
            maximum: 5,
        },
        review: String,
        rewatch: Boolean,
    },
    {
        timestamps: true,
    }
);

export const Watchlist = mongoose.model("Watchlist", watchlistSchema);
