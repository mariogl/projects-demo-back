import type { NextFunction, Response } from "express";
import { MongoServerError } from "mongodb";
import bcrypt from "bcryptjs";
import User from "../../database/models/User.js";
import type { CustomRequest } from "../types";
import CustomError from "../../errors/CustomError.js";

export const createUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { username, password, email } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      avatar: req.newFilename,
    });

    res.status(201).json({ username: newUser.username });
  } catch (error: unknown) {
    if (error instanceof MongoServerError) {
      const customError = new CustomError(
        "User already exists",
        "User already exists",
        409
      );
      next(customError);
    }

    const customError = new CustomError(
      (error as Error).message,
      "Error creating the user",
      500
    );
    next(customError);
  }
};
