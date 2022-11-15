import type { Response } from "express";
import CustomError from "../../errors/CustomError";
import { generalError, notFoundError } from "./errors";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a notFoundError middleware", () => {
  describe("When it receives a next function", () => {
    test("Then it should call the received next function with a 404 'Endpoint not found' error", () => {
      const next = jest.fn();

      notFoundError(null, null, next);

      expect(next.mock.calls[0][0]).toHaveProperty("statusCode", 404);
    });
  });
});

describe("Given a generalError middleware", () => {
  const error = new Error();
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  const next = () => {};

  describe("When it receives an error without status code and a response", () => {
    test("Then it should call its method status with code 500", () => {
      const expectedStatusCode = 500;

      generalError(error as CustomError, null, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });

  describe("When it receives an error without public message and a response", () => {
    test("Then it should call its method json with an error 'General error'", () => {
      const expectedError = { error: "General error" };

      generalError(error as CustomError, null, res as Response, next);

      expect(res.json).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives an error with status code 401 and a 'Unauthorized' public message and a response", () => {
    const statusCode = 401;
    const error = new CustomError("", "Unauthorized", statusCode);

    test("Then it should call its method status with code 401", () => {
      generalError(error, null, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });

    test("Then it should call its method json with a 'Unauthorized' error", () => {
      const expectedError = { error: "Unauthorized" };

      generalError(error, null, res as Response, next);

      expect(res.json).toHaveBeenCalledWith(expectedError);
    });
  });
});
