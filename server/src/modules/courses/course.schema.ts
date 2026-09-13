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

export const courseListQuerySchema = z.object({
  search: z.string().trim().optional(),

  status: z
    .enum(["draft", "published", "archived"])
    .optional(),

  sort: z
    .enum([
      "newest",
      "oldest",
      "title-asc",
      "title-desc",
    ])
    .default("newest"),

  page: z.coerce
    .number()
    .int()
    .positive()
    .default(1),

  limit: z.coerce
    .number()
    .int()
    .positive()
    .max(100)
    .default(10),
});

export type CourseListQuery = z.infer<
  typeof courseListQuerySchema
>;