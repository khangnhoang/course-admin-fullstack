export type Topic = {
  id: string;
  title: string;
  orderIndex: number;
  courseId: string;
};

export type CreateTopicInput = Pick<Topic, "title">;

export type UpdateTopicInput = Partial<Pick<Topic, "title" | "orderIndex">>;
