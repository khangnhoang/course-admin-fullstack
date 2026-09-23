import type { AuthIdentity } from "../modules/auth/auth.types.js";

declare global {
  namespace Express {
    interface Request {
      auth?: AuthIdentity;
    }
  }
}

export {};