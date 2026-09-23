import type {
  NextFunction,
  Request,
  Response,
} from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/env.js";
import { AppError } from "../../errors/AppError.js";

export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    throw new AppError(401, "Unauthorized");
  }

  const token = authorization.slice(7);

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    if (
      typeof payload === "string" ||
      typeof payload.userId !== "string"
    ) {
      throw new AppError(401, "Unauthorized");
    }

    req.auth = {
      userId: payload.userId,
    };

    next();
  } catch {
    throw new AppError(401, "Unauthorized");
  }
}