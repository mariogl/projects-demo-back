import type { Request } from "express";

export interface UserData {
  username: string;
  password: string;
  email: string;
}

export interface CustomRequest
  extends Partial<
    Request<Record<string, unknown>, Record<string, unknown>, UserData>
  > {
  newFilename?: string;
}
