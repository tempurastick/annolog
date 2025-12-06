import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = Schema(
    {
        name: {
            type: String,
            required: [true, "Please add a name"],
        },
        email: {
            type: String,
            required: [true, "Please add an email"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please add a password"],
        },
    },
    { timeStamps: true }
);

export const User = mongoose.model("User", userSchema);
