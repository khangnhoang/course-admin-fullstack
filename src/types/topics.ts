export type Topic = {
  id: string;
  title: string;
  orderIndex: number;
  courseId: string;
};

export type CreateTopicInput = Pick<Topic, "title">;

export type UpdateTopicInput = Pick<Topic, "title">;

export type TopicMoveDirection = "up" | "down";
