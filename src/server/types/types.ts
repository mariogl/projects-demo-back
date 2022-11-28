import type { JwtPayload } from "jsonwebtoken";

export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserData extends UserCredentials {
  email: string;
}

export interface ProjectData {
  name: string;
  date: Date;
  student: string;
  technologies: string[];
}

export interface JwtUserPayload extends JwtPayload {
  id: string;
}
