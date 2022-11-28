import fs from "fs/promises";
import path from "path";
import type { NextFunction, Response } from "express";
import { uploadsPath } from "../paths.js";
import { buildFilename } from "../utils/files.js";
import type { CustomRegisterRequest } from "../types.js";

const handleUpload = async (
  req: CustomRegisterRequest,
  res: Response,
  next: NextFunction
) => {
  const { file } = req;

  const newFilename = buildFilename(file.originalname, file.filename);

  await fs.rename(
    path.join(uploadsPath, "tmp", file.filename),
    path.join(uploadsPath, newFilename)
  );

  req.newFilename = newFilename;

  next();
};

export default handleUpload;
