import type { NextFunction, Response } from "express";
import type { JsonWebTokenError } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import environment from "../../loadEnvironment.js";
import type { CustomUserIdRequest } from "../types/requestTypes.js";
import type { JwtUserPayload } from "../types/types.js";
import createCustomError, { ErrorType } from "../utils/errors.js";

const auth = (req: CustomUserIdRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const error = createCustomError(ErrorType.jwtNotFound);
      throw error;
    }

    const token = authHeader.replace(/^Bearer\s*/, "");

    const userData = jwt.verify(
      token,
      environment.tokenSecret
    ) as JwtUserPayload;

    req.userId = userData.id;

    next();
  } catch (error: unknown) {
    if ((error as JsonWebTokenError).name === "JsonWebTokenError") {
      const customError = createCustomError(
        ErrorType.jwtInvalid,
        error as Error
      );
      next(customError);
      return;
    }

    next(error);
  }
};

export default auth;
