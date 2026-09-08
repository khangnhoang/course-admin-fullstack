import { pool } from "../../db/pool.js";
import type { CreateTopicInput, UpdateTopicInput } from "./topic.schema.js";
import type { PoolClient } from "pg";

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

export async function findMaxTopicOrderIndex(
  client: PoolClient,
  courseId: string,
) {
  const result = await client.query(
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
  client: PoolClient,
  courseId: string,
  input: CreateTopicInput,
  orderIndex: number,
) {
  const result = await client.query(
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

export async function updateTopicById(id: string, input: UpdateTopicInput) {
  const result = await pool.query(
    `
      UPDATE topics
      SET title = $1
      WHERE id = $2
      RETURNING
        id,
        title,
        order_index AS "orderIndex",
        course_id AS "courseId"
    `,
    [input.title, id],
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

export async function findTopicByIdForUpdate(client: PoolClient, id: string) {
  const result = await client.query(
    `
      SELECT
        id,
        title,
        order_index AS "orderIndex",
        course_id AS "courseId"
      FROM topics
      WHERE id = $1
      FOR UPDATE
    `,
    [id],
  );

  return result.rows[0];
}

export async function findTopicCourseId(client: PoolClient, id: string) {
  const result = await client.query(
    `
      SELECT
        course_id AS "courseId"
      FROM topics
      WHERE id = $1
    `,
    [id],
  );

  return result.rows[0];
}

export async function findAdjacentTopicForUpdate(
  client: PoolClient,
  courseId: string,
  orderIndex: number,
  direction: "up" | "down",
) {
  const query =
    direction === "up"
      ? `
          SELECT
            id,
            title,
            order_index AS "orderIndex",
            course_id AS "courseId"
          FROM topics
          WHERE course_id = $1
            AND order_index < $2
          ORDER BY order_index DESC
          LIMIT 1
          FOR UPDATE
        `
      : `
          SELECT
            id,
            title,
            order_index AS "orderIndex",
            course_id AS "courseId"
          FROM topics
          WHERE course_id = $1
            AND order_index > $2
          ORDER BY order_index ASC
          LIMIT 1
          FOR UPDATE
        `;

  const result = await client.query(query, [courseId, orderIndex]);

  return result.rows[0];
}

export async function updateTopicOrderIndex(
  client: PoolClient,
  id: string,
  orderIndex: number,
) {
  const result = await client.query(
    `
      UPDATE topics
      SET order_index = $1
      WHERE id = $2
      RETURNING
        id,
        title,
        order_index AS "orderIndex",
        course_id AS "courseId"
    `,
    [orderIndex, id],
  );

  return result.rows[0];
}
