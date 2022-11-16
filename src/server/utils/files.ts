import path from "path";
import fs from "fs/promises";

export const buildFilename = (originalName: string, hash: string): string => {
  const filenameExtension = path.extname(originalName);
  const newFilename =
    path.basename(originalName, filenameExtension) + hash + filenameExtension;

  return newFilename;
};

export const deleteMockImages = async (
  mocksPath: string,
  filenameStart: string,
  filenameEnd: string
) => {
  const filenames = await fs.readdir(mocksPath);
  const unlinkPromises: Array<Promise<void>> = [];

  filenames
    .filter(
      (filename) =>
        filename.startsWith(filenameStart) && filename.endsWith(filenameEnd)
    )
    .forEach((file) => {
      unlinkPromises.push(fs.unlink(path.join(mocksPath, file)));
    });

  await Promise.all(unlinkPromises);
};
