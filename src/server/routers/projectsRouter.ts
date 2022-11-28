import express from "express";
import { validate } from "express-validation";
import {
  createProject,
  getProjects,
} from "../controllers/projectsControllers.js";
import { partialPaths } from "../paths.js";
import { createProjectSchema } from "../schemas/projectsSchemas.js";

// eslint-disable-next-line new-cap
const projectsRouter = express.Router();

projectsRouter.get("/", getProjects);
projectsRouter.post(
  partialPaths.projects.create,
  validate(createProjectSchema, {}, { abortEarly: false }),
  createProject
);

export default projectsRouter;
