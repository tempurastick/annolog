import jwt from "jsonwebtoken";
import { User } from "../model/userModel.js";

export const protect = async (req, res, next) => {
    let token;

    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.userId).select("-password");

            next();
        } catch (err) {
            const error = new Error("Not authorized, token failed");
            error.status = 401;
            return next(error);
        }
    }
    if (!token) {
        const error = new Error(`Not Authorized, no token.`);
        error.status = 401;
        return next(error);
    }
};
