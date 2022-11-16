import "../../loadEnvironment.js";
import { ValidationError } from "express-validation";
import debugCreator from "debug";
import type { Request, Response, NextFunction } from "express";
import CustomError from "../../errors/CustomError.js";
import chalk from "chalk";

const debug = debugCreator("projects-back:server:middlewares:errors");

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new CustomError(
    "Endpoint not found",
    "Endpoint not found",
    404
  );
  next(error);
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction
) => {
  const privateMessage =
    error instanceof ValidationError
      ? error.details.body
          .map((errorDetails) => errorDetails.message)
          .join(", ")
      : error.message;

  debug(chalk.red.bold("Error: ", privateMessage));

  const statusCode = error.statusCode || 500;
  const publicMessage =
    error.publicMessage ||
    (error instanceof ValidationError ? "Wrong data" : "General error");

  res.status(statusCode).json({ error: publicMessage });
};
