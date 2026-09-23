import type { JwtPayload } from "jsonwebtoken";

export interface AuthTokenPayload extends JwtPayload {
  userId: string;
}

export type AuthIdentity = {
  userId: string;
};