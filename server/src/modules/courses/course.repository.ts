import { pool } from "../../db/pool.js";
import type {
  CreateCourseInput,
  UpdateCourseInput,
  CourseListQuery,
} from "./course.schema.js";
import type { PoolClient } from "pg";

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

export async function lockCourseById(client: PoolClient, id: string) {
  const result = await client.query(
    `
      SELECT id
      FROM courses
      WHERE id = $1
      FOR UPDATE
    `,
    [id],
  );

  return result.rows[0];
}

export async function findCourses(query: CourseListQuery) {
  const conditions: string[] = [];
  const values: unknown[] = [];

  if (query.search) {
    values.push(`%${query.search}%`);

    conditions.push(`title ILIKE $${values.length}`);
  }

  if (query.status) {
    values.push(query.status);

    conditions.push(`status = $${values.length}`);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const sortMap = {
    newest: "created_at DESC",
    oldest: "created_at ASC",
    "title-asc": "title ASC",
    "title-desc": "title DESC",
  } as const;

  const orderByClause = sortMap[query.sort];

  const offset = (query.page - 1) * query.limit;

  values.push(query.limit);
  const limitPlaceholder = `$${values.length}`;

  values.push(offset);
  const offsetPlaceholder = `$${values.length}`;

  const result = await pool.query(
    `
      SELECT
        id,
        title,
        status,
        created_at AS "createdAt"
      FROM courses
      ${whereClause}
      ORDER BY ${orderByClause}
      LIMIT ${limitPlaceholder}
      OFFSET ${offsetPlaceholder}
    `,
    values,
  );

  return result.rows;
}

export async function countCourses(
  query: CourseListQuery,
) {
  const conditions: string[] = [];
  const values: unknown[] = [];

  if (query.search) {
    values.push(`%${query.search}%`);
    conditions.push(
      `title ILIKE $${values.length}`,
    );
  }

  if (query.status) {
    values.push(query.status);
    conditions.push(
      `status = $${values.length}`,
    );
  }

  const whereClause =
    conditions.length > 0
      ? `WHERE ${conditions.join(" AND ")}`
      : "";

  const result = await pool.query(
    `
      SELECT COUNT(*) AS total
      FROM courses
      ${whereClause}
    `,
    values,
  );

  return Number(result.rows[0].total);
}

export async function findCourseOptions() {
  const result = await pool.query(`
    SELECT id, title
    FROM courses
    ORDER BY title ASC
  `);

  return result.rows;
}