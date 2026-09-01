import { pool } from "../../db/pool.js";
import type { CreateTopicInput, UpdateTopicInput } from "./topic.schema.js";

export async function findTopicsByCourseId(courseId: string) {
  const result = await pool.query(
    `
      SELECT
        id,
        title,
        order_index AS "orderIndex",
        course_id AS "courseId"
      FROM topics
      WHERE course_id = $1
      ORDER BY order_index ASC
    `,
    [courseId],
  );

  return result.rows;
}

export async function findMaxTopicOrderIndex(courseId: string) {
  const result = await pool.query(
    `
      SELECT COALESCE(MAX(order_index), 0) AS "maxOrderIndex"
      FROM topics
      WHERE course_id = $1
    `,
    [courseId],
  );

  return Number(result.rows[0].maxOrderIndex);
}

export async function createTopicRecord(
  courseId: string,
  input: CreateTopicInput,
  orderIndex: number,
) {
  const result = await pool.query(
    `
      INSERT INTO topics (
        course_id,
        title,
        order_index
      )
      VALUES ($1, $2, $3)
      RETURNING
        id,
        title,
        order_index AS "orderIndex",
        course_id AS "courseId"
    `,
    [courseId, input.title, orderIndex],
  );

  return result.rows[0];
}

export async function updateTopicById(
  id: string,
  input: UpdateTopicInput,
) {
  const result = await pool.query(
    `
      UPDATE topics
      SET
        title = COALESCE($1, title),
        order_index = COALESCE($2, order_index)
      WHERE id = $3
      RETURNING
        id,
        title,
        order_index AS "orderIndex",
        course_id AS "courseId"
    `,
    [input.title, input.orderIndex, id],
  );

  return result.rows[0];
}

export async function deleteTopicById(id: string) {
  const result = await pool.query(
    `
      DELETE FROM topics
      WHERE id = $1
      RETURNING id
    `,
    [id],
  );

  return result.rows[0];
}