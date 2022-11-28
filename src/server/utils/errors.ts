import CustomError from "../../errors/CustomError.js";

export enum ErrorType {
  auth,
  userRegister,
  userExists,
  cors,
  endpointNotFound,
}

const createCustomError = (
  type: ErrorType,
  privateErrorMessage?: string,
  error?: Error
) => {
  let publicErrorMessage: string;
  let errorStatusCode: number;

  switch (type) {
    case ErrorType.auth:
      publicErrorMessage = "Wrong credentials";
      errorStatusCode = 401;
      break;
    case ErrorType.userExists:
      publicErrorMessage = "User already exists";
      errorStatusCode = 409;
      break;
    case ErrorType.userRegister:
      publicErrorMessage = "Error registering the user";
      errorStatusCode = 500;
      break;
    case ErrorType.cors:
      publicErrorMessage = "CORS error";
      errorStatusCode = 401;
      break;
    case ErrorType.endpointNotFound:
      publicErrorMessage = "Endpoint not found";
      errorStatusCode = 404;
      break;
    default:
      publicErrorMessage = "General error";
      errorStatusCode = 500;
  }

  const customError = new CustomError(
    privateErrorMessage ?? error.message,
    publicErrorMessage,
    errorStatusCode
  );
  return customError;
};

export default createCustomError;
