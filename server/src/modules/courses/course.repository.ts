import { pool } from "../../db/pool.js";
import type { CreateCourseInput, UpdateCourseInput } from "./course.schema.js";

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

export async function createCourseRecord(input: CreateCourseInput) {
  const result = await pool.query(
    `
      INSERT INTO courses (title, status)
      VALUES ($1, $2)
      RETURNING
        id,
        title,
        status,
        created_at AS "createdAt"
    `,
    [input.title, input.status],
  );

  return result.rows[0];
}

export async function updateCourseById(id: string, input: UpdateCourseInput) {
  const result = await pool.query(
    `
      UPDATE courses
      SET
        title = COALESCE($1, title),
        status = COALESCE($2, status)
      WHERE id = $3
      RETURNING
        id,
        title,
        status,
        created_at AS "createdAt"
    `,
    [input.title, input.status, id],
  );

  return result.rows[0];
}

export async function deleteCourseById(id: string) {
  const result = await pool.query(
    `
      DELETE FROM courses
      WHERE id = $1
      RETURNING id
    `,
    [id],
  );

  return result.rows[0];
}