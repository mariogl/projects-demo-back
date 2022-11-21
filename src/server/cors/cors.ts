import cors from "cors";
import CustomError from "../../errors/CustomError";
import allowedOrigins from "../allowedOrigins";

const corsMiddleware = cors({
  origin(requestOrigin, callback) {
    if (!requestOrigin || allowedOrigins.includes(requestOrigin)) {
      callback(null, requestOrigin);
      return;
    }

    callback(new CustomError("CORS error", "CORS error", 401));
  },
});

export default corsMiddleware;
