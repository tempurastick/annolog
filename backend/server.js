import express from "express";
import path from "path";

import { fileURLToPath } from "url";
import runDB from "./config/db.js";
import cookieParser from "cookie-parser";
import posts from "./routes/posts.js";
import goals from "./routes/goals.js";
import users from "./routes/users.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

runDB().catch(console.dir);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Logger middleware
app.use(logger);

// setup static folder
//app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/api/posts", posts);
app.use("/api/goals", goals);
app.use("/api/users", users);
app.use(notFound);

// error handler should be declared below routes
app.use(errorHandler);
app.listen(port, () => console.log(`Server is running on Port ${port}`));
