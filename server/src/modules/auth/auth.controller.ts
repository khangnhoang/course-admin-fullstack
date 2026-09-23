import type { Request, Response } from "express";
import { z } from "zod";
import { registerSchema, loginSchema } from "./auth.schema.js";
import { registerUser, loginUser, getCurrentUser } from "./auth.service.js";
import { AppError } from "../../errors/AppError.js";

export async function registerController(
  req: Request,
  res: Response,
) {
  const parsed = registerSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      message: "Invalid register data",
      errors: z.flattenError(parsed.error),
    });
    return;
  }

  const user = await registerUser(parsed.data);

  res.status(201).json(user);
}

export async function loginController(
  req: Request,
  res: Response,
) {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      message: "Invalid login data",
      errors: z.flattenError(parsed.error),
    });

    return;
  }

  const session = await loginUser(parsed.data);

  res.status(200).json(session);
}

export async function getMeController(
  req: Request,
  res: Response,
) {
  const userId = req.auth?.userId;

  if (!userId) {
    throw new AppError(401, "Unauthorized");
  }

  const user = await getCurrentUser(userId);

  res.status(200).json(user);
}