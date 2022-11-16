import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app";
import { paths, uploadsPath } from "../paths";
import type { UserData } from "../types";
import connectDb from "../../database";
import mongoose from "mongoose";
import { deleteMockImages } from "../utils/files";
import User from "../../database/models/User";

const mockNameStart = "mock-avatar";
const mockNameEnd = ".jpg";
let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDb(server.getUri());
});

afterAll(async () => {
  await deleteMockImages(uploadsPath, mockNameStart, mockNameEnd);
  await mongoose.connection.close();
  await server.stop();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe("Given a POST /user/register endpoint", () => {
  describe("When it receives a request with a non-existent user with username 'luis'", () => {
    test("Then it should respond with a status code 201 and the received username", async () => {
      const userData: UserData = {
        username: "luis",
        password: "12345678",
        email: "luis@luis.com",
      };

      const response = await request(app)
        .post(paths.users.register)
        .field("username", userData.username)
        .field("password", userData.password)
        .field("email", userData.email)
        .attach("avatar", Buffer.from("test-avatar"), {
          filename: `${mockNameStart}${mockNameEnd}`,
        })
        .expect(201);

      expect(response.body).toHaveProperty("username", userData.username);
    });
  });
});
