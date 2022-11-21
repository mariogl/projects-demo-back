import request from "supertest";
import app from "../app";

describe("Given a GET / endpoint", () => {
  describe("When it receives a request from a known origin http://localhost:3000", () => {
    test("Then it should respond with a 200 status code", async () => {
      await request(app).get("/").expect(200);
    });
  });

  describe("When it receives a request from an unknown origin http://test.com", () => {
    test("Then it should respond with a 401 'CORS error' error", async () => {
      const response = await request(app)
        .get("/")
        .set("Origin", "http://test.com")
        .expect(401);

      expect(response.body).toHaveProperty("error", "CORS error");
    });
  });
});
