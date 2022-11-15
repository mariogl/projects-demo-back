import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../../database/models/User.js";
import type { BodyWithUserData } from "../types";
import CustomError from "../../errors/CustomError.js";

export const createUser = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    BodyWithUserData
  >,
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
      avatar: "mi-cara.jpg",
    });

    res.status(201).json({ username: newUser.username });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      "Error creating the user",
      500
    );
    next(customError);
  }
};
