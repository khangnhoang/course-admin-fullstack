import { pool } from "../../db/pool.js";

export async function findAllCourses() {
  const result = await pool.query(`
    SELECT
      id,
      title,
      status,
      created_at AS "createdAt"
    FROM courses
    ORDER BY created_at DESC
  `);

  return result.rows;
}

export async function findCourseById(id: string) {
  const result = await pool.query(
    `
      SELECT
        id,
        title,
        status,
        created_at AS "createdAt"
      FROM courses
      WHERE id = $1
    `,
    [id],
  );

  return result.rows[0];
}