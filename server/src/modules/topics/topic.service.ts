import { pool } from "../../db/pool.js";
import { lockCourseById } from "../courses/course.repository.js";

import {
  createTopicRecord,
  deleteTopicById,
  findAdjacentTopicForUpdate,
  findMaxTopicOrderIndex,
  findTopicByIdForUpdate,
  findTopicCourseId,
  findTopicsByCourseId,
  updateTopicById,
  updateTopicOrderIndex,
} from "./topic.repository.js";

import type {
  CreateTopicInput,
  MoveTopicInput,
  UpdateTopicInput,
} from "./topic.schema.js";

export async function getTopicsByCourseId(courseId: string) {
  return findTopicsByCourseId(courseId);
}

export async function createTopic(courseId: string, input: CreateTopicInput) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const course = await lockCourseById(client, courseId);

    if (!course) {
      await client.query("COMMIT");
      return undefined;
    }

    const maxOrderIndex = await findMaxTopicOrderIndex(client, courseId);

    const nextOrderIndex = maxOrderIndex + 1;

    const topic = await createTopicRecord(
      client,
      courseId,
      input,
      nextOrderIndex,
    );

    await client.query("COMMIT");

    return topic;
  } catch (error) {
    await client.query("ROLLBACK");

    throw error;
  } finally {
    client.release();
  }
}

export async function moveTopic(
  id: string,
  input: MoveTopicInput,
) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Bước 1: chỉ cần biết topic thuộc course nào
    const topicCourse = await findTopicCourseId(
      client,
      id,
    );

    if (!topicCourse) {
      await client.query("COMMIT");
      return undefined;
    }

    // Bước 2: serialize mọi ordering operation của course này
    await lockCourseById(
      client,
      topicCourse.courseId,
    );

    // Bước 3: đọc lại current topic sau khi đã có Course lock
    const currentTopic =
      await findTopicByIdForUpdate(
        client,
        id,
      );

    if (!currentTopic) {
      await client.query("COMMIT");
      return undefined;
    }

    // Bước 4: tìm + lock hàng xóm
    const targetTopic =
      await findAdjacentTopicForUpdate(
        client,
        currentTopic.courseId,
        currentTopic.orderIndex,
        input.direction,
      );

    // Đang ở đầu/cuối list → successful no-op
    if (!targetTopic) {
      await client.query("COMMIT");
      return currentTopic;
    }

    // Bước 5: tìm một index tạm chắc chắn đang trống
    const maxOrderIndex =
      await findMaxTopicOrderIndex(
        client,
        currentTopic.courseId,
      );

    const temporaryOrderIndex =
      maxOrderIndex + 1;

    // A = 2, B = 3, temp = 6
    // A: 2 -> 6
    await updateTopicOrderIndex(
      client,
      currentTopic.id,
      temporaryOrderIndex,
    );

    // B: 3 -> 2
    await updateTopicOrderIndex(
      client,
      targetTopic.id,
      currentTopic.orderIndex,
    );

    // A: 6 -> 3
    const movedTopic =
      await updateTopicOrderIndex(
        client,
        currentTopic.id,
        targetTopic.orderIndex,
      );

    await client.query("COMMIT");

    return movedTopic;
  } catch (error) {
    await client.query("ROLLBACK");

    throw error;
  } finally {
    client.release();
  }
}

export async function updateTopic(id: string, input: UpdateTopicInput) {
  return updateTopicById(id, input);
}

export async function deleteTopic(id: string) {
  return deleteTopicById(id);
}
