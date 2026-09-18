import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "./auth.repository.js";
import type { RegisterInput } from "./auth.schema.js";
import { AppError } from "../../errors/AppError.js";

export async function registerUser(input: RegisterInput) {
  const existingUser = await findUserByEmail(input.email);

  if (existingUser) {
    throw new AppError(409, "Email already exists");
  }

  const passwordHash = await bcrypt.hash(input.password, 12);

  return createUser(input.email, passwordHash);
}
