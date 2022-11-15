import environment from "./loadEnvironment.js";
import debugCreator from "debug";
import startServer from "./server/index.js";
import app from "./server/app.js";
import chalk from "chalk";
import connectDb from "./database/index.js";

const debug = debugCreator("projects-back:root");

try {
  await startServer(app, environment.port);
  debug(
    chalk.green(`Server listening on http://localhost:${environment.port}`)
  );

  await connectDb(environment.mongoUrl);
  debug(chalk.green("Connected to database"));
} catch (error: unknown) {
  debug(chalk.red.bold("Error: ", (error as Error).message));
}
