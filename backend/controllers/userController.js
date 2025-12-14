import { User } from "../model/userModel.js";

import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// @desc create a new user
// @route POST /api/users
export const registerUser = async (req, res, next) => {
    const { name, email, password } = await req.body;
    const missingRequiredField = name && email && password ? false : true;

    if (missingRequiredField) {
        const error = new Error(`Please fill all fields`);
        error.status = 400;
        return next(error);
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        const error = new Error(`A user with this email already exists`);
        error.status = 400;
        return next(error);
    }

    // create user
    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        const error = new Error(`Invalid user data`);
        error.status = 400;
        return next(error);
    }
};

// @desc authenticate a  user
// @route POST /api/users/auth

export const loginUser = async (req, res, next) => {
    const { email, password } = await req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        const error = new Error(`Invalid credentials`);
        error.status = 401;
        return next(error);
    }
};

// @desc get user data
// @route GET /api/users/me
// @access Private
export const getCurrentUser = async (req, res, next) => {
    const { _id, name, email } = await User.findById(req.user._id);

    res.status(200).json({
        id: _id,
        name,
        email,
    });
};

// @desc logout user
// @route POST /api/users/logout
export const logoutUser = (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: "Logged out successfully" });
};

// @desc update user profile
// @route PUT /api/users/profile
export const updateUserProfile = async (req, res, next) => {
    const { name, email, password, bio } = await req.body;

    const user = await User.findById(req.user._id);

    if (user) {
        user.name = name || user.name;
        user.email = email || user.email;
        user.bio = bio || user.bio;

        if (password) {
            user.password = password;
        }

        const updateUser = await user.save();

        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            bio: updateUser.bio,
        });
    } else {
        const error = new Error(`User not found`);
        error.status = 401;
        return next(error);
    }
};
