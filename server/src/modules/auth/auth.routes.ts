// server/src/modules/auth/auth.routes.ts

import { Router } from "express";
import { registerController } from "./auth.controller.js";

export const authRouter = Router();

authRouter.post("/register", registerController);