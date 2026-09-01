import type {
  CreateTopicInput,
  Topic,
  UpdateTopicInput,
} from "../types/topics";

const COURSE_API_URL = "http://localhost:3000/api/courses";
const TOPIC_API_URL = "http://localhost:3000/api/topics";

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