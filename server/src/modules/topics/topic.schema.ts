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

export const updateTopicSchema = z
  .object({
    title: z.string().trim().min(1).optional(),
    orderIndex: z.number().int().positive().optional(),
  })
  .refine(
    (data) =>
      data.title !== undefined ||
      data.orderIndex !== undefined,
    {
      message: "At least one field is required",
    },
  );

export type CreateTopicInput = z.infer<
  typeof createTopicSchema
>;

export type UpdateTopicInput = z.infer<
  typeof updateTopicSchema
>;