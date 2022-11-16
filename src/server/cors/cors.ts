import cors from "cors";

const allowedOrigins = ["http://localhost:3000"];

const corsMiddleware = cors({
  origin(requestOrigin, callback) {
    if (!requestOrigin || allowedOrigins.includes(requestOrigin)) {
      callback(null, requestOrigin);
      return;
    }

    callback(new Error("CORS error"));
  },
});

export default corsMiddleware;
