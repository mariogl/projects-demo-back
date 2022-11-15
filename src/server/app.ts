import express from "express";
import morgan from "morgan";
import cors from "cors";
import allowedOrigins from "./allowedOrigins.js";
import { generalError, notFoundError } from "./middlewares/errors.js";
import { partialPaths } from "./paths.js";
import usersRouter from "./routers/usersRouter.js";

const app = express();

app.use(
  cors({
    origin(requestOrigin, callback) {
      if (!requestOrigin || allowedOrigins.includes(requestOrigin)) {
        callback(null, requestOrigin);
        return;
      }

      callback(new Error("CORS error"));
    },
  })
);
app.use(morgan("dev"));

app.use(partialPaths.users.base, usersRouter);

app.use(notFoundError);
app.use(generalError);

export default app;
