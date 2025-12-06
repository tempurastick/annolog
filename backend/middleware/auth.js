import jwt from "jsonwebtoken";
import { User } from "../model/userModel.js";

export const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // get token from header
            token = req.headers.authorization.split(" ")[1];
            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // get user from the token
            req.user = await User.findById(decoded.id).select("-password");
            return next();
        } catch (e) {
            console.log(e);
            const error = new Error(`Not Authorized: ${e}`);
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
