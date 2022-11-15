import request from "supertest";
import app from "../app";

describe("Given a non-existent GET /french-fries endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a 404 'Endpoint not found' error", async () => {
      const response = await request(app).get("/french-fries").expect(404);
      const errorMessage = "Endpoint not found";

      expect(response.body).toHaveProperty("error", errorMessage);
    });
  });
});
