import cors from "cors";
import allowedOrigins from "../allowedOrigins.js";
import createCustomError, { ErrorType } from "../utils/errors.js";

const corsMiddleware = cors({
  origin(requestOrigin, callback) {
    if (!requestOrigin || allowedOrigins.includes(requestOrigin)) {
      callback(null, requestOrigin);
      return;
    }

    callback(createCustomError(ErrorType.cors));
  },
});

export default corsMiddleware;
