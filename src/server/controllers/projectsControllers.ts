import type { NextFunction, Response } from "express";
import Project from "../../database/models/Project.js";
import type { CustomUserIdRequest } from "../types/requestTypes.js";
import createCustomError, { ErrorType } from "../utils/errors.js";

export const getProjects = async (
  req: CustomUserIdRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;

  try {
    const projects = await Project.find({ user: userId }).populate(
      "student",
      "-password"
    );

    res.status(200).json({ projects });
  } catch (error: unknown) {
    next(error);
  }
};

export const createProject = async (
  req: CustomUserIdRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId, body: projectData } = req;

  try {
    const newProject = await Project.create({ ...projectData, user: userId });

    res.status(201).json({ project: newProject });
  } catch (error: unknown) {
    const customError = createCustomError(
      ErrorType.createProject,
      error as Error
    );
    next(customError);
  }
};
