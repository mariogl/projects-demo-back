import type { Response, Request } from "express";
import { MongoServerError } from "mongodb";
import User from "../../database/models/User";
import CustomError from "../../errors/CustomError";
import type { CustomRequest } from "../types";
import { createUser } from "./usersControllers";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given an createUser controller", () => {
  describe("When it receives username 'luis' and password '1234' and a response", () => {
    const req: CustomRequest = {
      body: {
        username: "luis",
        password: "1234",
        email: "luis@1234.com",
      },
      file: {
        originalname: "gatete.jpg",
        buffer: null,
        destination: "",
        fieldname: "",
        filename: "",
        mimetype: "",
        path: "",
        size: 0,
        stream: null,
        encoding: "",
      },
    };
    const next = () => {};

    test("Then it should call its method status with code 201", async () => {
      const expectedStatusCode = 201;

      User.create = jest.fn().mockResolvedValue({
        _id: "asdf",
        username: "luis",
        password: "sadfljk",
        email: "luis@marta.com",
        avatar: "gatete.jpg",
      });

      await createUser(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its method json with the username 'luis'", async () => {
      await createUser(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ username: req.body.username });
    });
  });

  describe("When it receives an existent username 'marta' and a next function", () => {
    test("Then it should call next function with a 409 'User already exists' error", async () => {
      const expectedErrorMessage = "User already exists";
      const mongoServerError = new MongoServerError({});
      const expectedError = new CustomError(
        expectedErrorMessage,
        expectedErrorMessage,
        409
      );
      const req: CustomRequest = {
        body: {
          username: "marta",
          password: "1234",
          email: "marta@1234.com",
        },
        file: {
          originalname: "gatete.jpg",
          buffer: null,
          destination: "",
          fieldname: "",
          filename: "",
          mimetype: "",
          path: "",
          size: 0,
          stream: null,
          encoding: "",
        },
      };
      const next = jest.fn();

      User.create = jest.fn().mockRejectedValue(mongoServerError);

      await createUser(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
