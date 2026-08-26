import { z } from "zod";

const courseStatusSchema = z.enum([
  "draft",
  "published",
  "archived",
]);

export const courseIdParamsSchema = z.object({
  id: z.uuid(),
});

export const createCourseSchema = z.object({
  title: z.string().trim().min(1),
  status: courseStatusSchema,
});

export const updateCourseSchema = z
  .object({
    title: z.string().trim().min(1).optional(),
    status: courseStatusSchema.optional(),
  })
  .refine(
    (data) => data.title !== undefined || data.status !== undefined,
    {
      message: "At least one field is required",
    },
  );

export type CreateCourseInput = z.infer<
  typeof createCourseSchema
>;

export type UpdateCourseInput = z.infer<
  typeof updateCourseSchema
>;