// server/src/modules/auth/auth.routes.ts

import { Router } from "express";
import { registerController, loginController, getMeController } from "./auth.controller.js";

import { authMiddleware } from "./auth.middleware.js";

export const authRouter = Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get("/me", authMiddleware, getMeController);