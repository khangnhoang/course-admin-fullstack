import "dotenv/config";

import { pool } from "./pool.js";

try {
  const result = await pool.query("SELECT NOW() AS now");

  const result1 = await pool.query(`
  SELECT id, title, status, created_at
  FROM courses
  ORDER BY created_at DESC
`);

  console.log("Database connected successfully");
  console.log("PostgreSQL time:", result.rows[0].now);
  console.log("test:", result1.rows[0]);
} catch (error) {
  console.error("Database connection failed:", error);
} finally {
  await pool.end();
}
