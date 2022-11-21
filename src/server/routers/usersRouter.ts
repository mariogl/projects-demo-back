import express from "express";
import path from "path";
import { validate } from "express-validation";
import multer from "multer";
import { createUser } from "../controllers/usersControllers.js";
import handleUpload from "../middlewares/handleUpload.js";
import { partialPaths, uploadsPath } from "../paths.js";
import { userDataSchema } from "../schemas/usersSchemas.js";

const upload = multer({
  dest: path.join(uploadsPath, "tmp"),
});

// eslint-disable-next-line new-cap
const usersRouter = express.Router();

usersRouter.post(
  partialPaths.users.register,
  upload.single("avatar"),
  validate(userDataSchema, {}, { abortEarly: false }),
  handleUpload,
  createUser
);

export default usersRouter;
