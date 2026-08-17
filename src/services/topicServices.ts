import type { Topic } from "../types/topics";
import { initialTopics } from "../data/topics";
import { delay } from "../utils/delay";

export async function createTopic(input: Topic) {
  await delay();

  initialTopics.push(input);
}

export async function updateTopic(updatedTopic: Topic): Promise<void> {
  await delay();

  const index = initialTopics.findIndex(
    (topic) => topic.id === updatedTopic.id,
  );

  if (index === -1) {
    throw new Error("Topic not found");
  }

  initialTopics[index] = updatedTopic;
}