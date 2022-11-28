import type { Request } from "express";

export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserData extends UserCredentials {
  email: string;
}

export interface CustomRegisterRequest
  extends Partial<
    Request<Record<string, unknown>, Record<string, unknown>, UserData>
  > {
  newFilename?: string;
}

export type CustomLoginRequest = Partial<
  Request<Record<string, unknown>, Record<string, unknown>, UserCredentials>
>;
