import type { Request, Response } from "express";
import Project from "../../database/models/Project";
import { getMockProject } from "../../factories/projects";
import { createProject } from "./projectsControllers";

const mockProject = getMockProject();

describe("Given a createProject controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Project.create = jest.fn().mockResolvedValue(mockProject);
  });

  describe("When it receives a request with a new project", () => {
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    const req: Partial<Request> = {
      body: mockProject,
    };

    test("Then it should call its method status with status code 201", async () => {
      const expectedStatusCode = 201;

      await createProject(req as Request, res as Response, () => {});

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its method json with the new project", async () => {
      const expectedResponse = {
        project: mockProject,
      };

      await createProject(req, res as Response, () => {});

      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });

  describe("When it receives a request with missing data", () => {
    const mockProject = getMockProject({ name: null });

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    const req: Partial<Request> = {
      body: mockProject,
    };

    test("Then it should call next function with a 500 'Error creating the project' error", async () => {
      const next = jest.fn();
      const error = new Error("error");

      Project.create = jest.fn().mockRejectedValue(error);

      await createProject(req, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
