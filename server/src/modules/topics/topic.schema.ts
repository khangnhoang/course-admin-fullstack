import { z } from "zod";

export const courseIdParamsSchema = z.object({
  courseId: z.uuid(),
});

export const topicIdParamsSchema = z.object({
  id: z.uuid(),
});

export const createTopicSchema = z.object({
  title: z.string().trim().min(1),
});

export const updateTopicSchema = z.object({
  title: z.string().trim().min(1),
});

export type CreateTopicInput = z.infer<typeof createTopicSchema>;

export type UpdateTopicInput = z.infer<typeof updateTopicSchema>;

export const moveTopicSchema = z.object({
  direction: z.enum(["up", "down"]),
});

export type MoveTopicInput = z.infer<typeof moveTopicSchema>;
