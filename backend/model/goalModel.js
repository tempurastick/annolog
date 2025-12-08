import mongoose from "mongoose";

const goalSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        text: {
            type: String,
            required: [true, "Please add a text value"],
        },
        status: {
            type: String,
            enum: ["Incomplete", "Completed", "Paused"],
            default: "Incomplete",
        },
    },
    {
        timestamps: true,
    }
);

export const Goal = mongoose.model("Goal", goalSchema);
