import type {
  CreateTopicInput,
  Topic,
  UpdateTopicInput,
  TopicMoveDirection,
} from "../types/topics";

import { API_URL } from "../config/api";

const COURSE_API_URL = `${API_URL}/api/courses`;
const TOPIC_API_URL = `${API_URL}/api/topics`;

export async function getTopicsByCourseId(
  courseId: string,
): Promise<Topic[]> {
  const response = await fetch(
    `${COURSE_API_URL}/${courseId}/topics`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch topics");
  }

  return response.json();
}

export async function createTopic(
  courseId: string,
  input: CreateTopicInput,
): Promise<Topic> {
  const response = await fetch(
    `${COURSE_API_URL}/${courseId}/topics`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to create topic");
  }

  return response.json();
}

export async function updateTopic(
  id: string,
  input: UpdateTopicInput,
): Promise<Topic> {
  const response = await fetch(
    `${TOPIC_API_URL}/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update topic");
  }

  return response.json();
}

export async function deleteTopic(
  id: string,
): Promise<void> {
  const response = await fetch(
    `${TOPIC_API_URL}/${id}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete topic");
  }
}

export async function moveTopic(
  id: string,
  direction: TopicMoveDirection,
): Promise<Topic> {
  const response = await fetch(
    `${TOPIC_API_URL}/${id}/move`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ direction }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to move topic");
  }

  return response.json();
}