import { User } from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// @desc create a new user
// @route POST /api/users
export const registerUser = async (req, res, next) => {
    if (!req.body) {
        const error = new Error(`Empty request`);
        error.status = 400;
        return next(error);
    }

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

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        const error = new Error(`Invalid user data`);
        error.status = 400;
        return next(error);
    }
};

// @desc authenticate a  user
// @route POST /api/users/login

export const loginUser = async (req, res, next) => {
    if (!req.body) {
        const error = new Error(`Empty request`);
        error.status = 400;
        return next(error);
    }
    const { email, password } = await req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        const error = new Error(`Invalid credentials`);
        error.status = 400;
        return next(error);
    }
};

// @desc get user data
// @route GET /api/users/me
// @access Private
export const getCurrentUser = async (req, res, next) => {
    const { _id, name, email } = await User.findById(req.user.id);

    res.status(200).json({
        id: _id,
        name,
        email,
    });
};

// generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};
