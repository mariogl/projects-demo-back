import type { NextFunction, Response } from "express";
import { MongoServerError } from "mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../database/models/User.js";
import type { CustomLoginRequest, CustomRegisterRequest } from "../types";
import environment from "../../loadEnvironment.js";
import createCustomError, { ErrorType } from "../utils/errors.js";

export const createUser = async (
  req: CustomRegisterRequest,
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
      const customError = createCustomError(ErrorType.userExists, null, error);
      next(customError);
      return;
    }

    const customError = createCustomError(ErrorType.userRegister);
    next(customError);
  }
};

export const loginUser = async (
  req: CustomLoginRequest,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user) {
      if (!(await bcrypt.compare(password, user.password))) {
        const error = createCustomError(
          ErrorType.auth,
          "Passwords don't match"
        );
        throw error;
      }

      const userData = {
        id: user._id,
      };

      const token = jwt.sign(userData, environment.tokenSecret);

      res.status(200).json({ token });
      return;
    }

    const error = createCustomError(ErrorType.auth, "User doesn't exist");
    throw error;
  } catch (error: unknown) {
    next(error);
  }
};
