// checks if the user exists or is authorized
export default function checkUser(collection, user, next) {
    if (!user) {
        const error = new Error("User not found");
        error.status = 401;
        return next(error);
    }

    // make sure logged in user matches the goal user
    if (collection.user.toString() !== user.id) {
        const error = new Error("User not authorized");
        error.status = 401;
        return next(error);
    }
}
