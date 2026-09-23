import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail, findUserById } from "./auth.repository.js";
import type { RegisterInput, LoginInput, AuthUser } from "./auth.schema.js";
import { AppError } from "../../errors/AppError.js";

import { JWT_SECRET } from "../../config/env.js";

export async function registerUser(input: RegisterInput) {
  const existingUser = await findUserByEmail(input.email);

  if (existingUser) {
    throw new AppError(409, "Email already exists");
  }

  const passwordHash = await bcrypt.hash(input.password, 12);

  const user = await createUser(input.email, passwordHash);

  return createAuthSession({
    id: user.id,
    email: user.email,
  });
}

export async function loginUser(input: LoginInput) {
  const user = await findUserByEmail(input.email);

  if (!user) {
    throw new AppError(401, "Invalid email or password");
  }

  const passwordMatches = await bcrypt.compare(
    input.password,
    user.passwordHash,
  );

  if (!passwordMatches) {
    throw new AppError(401, "Invalid email or password");
  }

  return createAuthSession({
    id: user.id,
    email: user.email,
  });
}

function createAuthSession(user: AuthUser) {
  const token = jwt.sign(
    {
      userId: user.id,
    },
    JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  };
}

export async function getCurrentUser(userId: string) {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError(401, "Unauthorized");
  }

  return {
    id: user.id,
    email: user.email,
  };
}