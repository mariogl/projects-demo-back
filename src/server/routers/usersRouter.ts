import express from "express";
import { validate } from "express-validation";
import multer from "multer";
import { createUser } from "../controllers/usersControllers.js";
import { partialPaths, uploadsPath } from "../paths.js";
import { userDataSchema } from "../schemas/usersSchemas.js";

const upload = multer({
  dest: uploadsPath,
});

// eslint-disable-next-line new-cap
const usersRouter = express.Router();

usersRouter.post(
  partialPaths.users.register,
  upload.single("avatar"),
  validate(userDataSchema, {}, { abortEarly: false }),
  createUser
);

export default usersRouter;
