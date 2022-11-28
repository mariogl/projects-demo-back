import type { Request } from "express";
import type { ProjectData, UserCredentials, UserData } from "./types.js";

export interface CustomRegisterRequest
  extends Partial<
    Request<Record<string, unknown>, Record<string, unknown>, UserData>
  > {
  newFilename?: string;
}

export type CustomLoginRequest = Partial<
  Request<Record<string, unknown>, Record<string, unknown>, UserCredentials>
>;

export type CustomCreateProjectRequest = Partial<
  Request<Record<string, unknown>, Record<string, unknown>, ProjectData>
>;

export interface CustomUserIdRequest extends CustomCreateProjectRequest {
  userId?: string;
}
