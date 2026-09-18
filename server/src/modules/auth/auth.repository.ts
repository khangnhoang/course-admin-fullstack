import { pool } from "../../db/pool.js";

export async function findUserByEmail(email: string) {
  const result = await pool.query(
    `
      SELECT
        id,
        email,
        password_hash AS "passwordHash",
        created_at AS "createdAt"
      FROM users
      WHERE email = $1
    `,
    [email],
  );

  return result.rows[0] ?? null;
}

export async function createUser(
  email: string,
  passwordHash: string,
) {
  const result = await pool.query(
    `
      INSERT INTO users (email, password_hash)
      VALUES ($1, $2)
      RETURNING
        id,
        email,
        created_at AS "createdAt"
    `,
    [email, passwordHash],
  );

  return result.rows[0];
}