import {
  createTopicRecord,
  deleteTopicById,
  findMaxTopicOrderIndex,
  findTopicsByCourseId,
  updateTopicById,
} from "./topic.repository.js";
import type { CreateTopicInput, UpdateTopicInput } from "./topic.schema.js";
import { getCourseById } from "../courses/course.service.js";

export async function getTopicsByCourseId(courseId: string) {
  return findTopicsByCourseId(courseId);
}

export async function createTopic(courseId: string, input: CreateTopicInput) {
  const course = await getCourseById(courseId);

  if (!course) {
    return undefined;
  }

  const maxOrderIndex = await findMaxTopicOrderIndex(courseId);

  const nextOrderIndex = maxOrderIndex + 1;

  return createTopicRecord(courseId, input, nextOrderIndex);
}

export async function updateTopic(id: string, input: UpdateTopicInput) {
  return updateTopicById(id, input);
}

export async function deleteTopic(id: string) {
  return deleteTopicById(id);
}
