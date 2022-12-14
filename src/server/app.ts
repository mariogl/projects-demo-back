import express from "express";
import morgan from "morgan";
import { generalError, notFoundError } from "./middlewares/errors.js";
import { partialPaths, uploadsPath } from "./paths.js";
import usersRouter from "./routers/usersRouter.js";
import corsMiddleware from "./cors/cors.js";
import { ping } from "./middlewares/ping.js";
import projectsRouter from "./routers/projectsRouter.js";
import auth from "./middlewares/auth.js";

const app = express();

app.use(corsMiddleware);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(uploadsPath));

app.get("/", ping);
app.use(partialPaths.users.base, usersRouter);
app.use(auth);
app.use(partialPaths.projects.base, projectsRouter);

app.use(notFoundError);
app.use(generalError);

export default app;
