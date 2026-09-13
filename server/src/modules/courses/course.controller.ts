import type { Request, Response } from "express";
import { z } from "zod";

import {
  createCourseSchema,
  courseIdParamsSchema,
  updateCourseSchema,
  courseListQuerySchema,
} from "./course.schema.js";

import {
  getCourseById,
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseOptions,
} from "./course.service.js";

export async function getCoursesController(
  req: Request,
  res: Response,
) {
  const parsedQuery =
    courseListQuerySchema.safeParse(req.query);

  if (!parsedQuery.success) {
    res.status(400).json({
      message: "Invalid course query",
      errors: z.flattenError(parsedQuery.error),
    });

    return;
  }

  const result = await getCourses(
    parsedQuery.data,
  );

  res.status(200).json(result);
}

export async function getCourseByIdController(
  req: Request<{ id: string }>,
  res: Response,
) {
  const id = req.params.id;

  const course = await getCourseById(id);

  if (!course) {
    res.status(404).json({
      message: "Course not found",
    });

    return;
  }

  res.status(200).json(course);
}

export async function createCourseController(req: Request, res: Response) {
  const parsed = createCourseSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      message: "Invalid course data",
      errors: z.flattenError(parsed.error),
    });

    return;
  }

  const course = await createCourse(parsed.data);

  res.status(201).json(course);
}

export async function updateCourseController(
  req: Request<{ id: string }>,
  res: Response,
) {
  const id = req.params.id;

  const parsedParams = courseIdParamsSchema.safeParse({ id });

  if (!parsedParams.success) {
    res.status(400).json({
      message: "Invalid course ID",
      errors: z.flattenError(parsedParams.error),
    });

    return;
  }

  const parsedBody = updateCourseSchema.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(400).json({
      message: "Invalid course data",
      errors: z.flattenError(parsedBody.error),
    });

    return;
  }

  const course = await updateCourse(parsedParams.data.id, parsedBody.data);

  if (!course) {
    res.status(404).json({
      message: "Course not found",
    });
    return;
  }

  res.status(200).json(course);
}

export async function deleteCourseController(
  req: Request<{ id: string }>,
  res: Response,
) {
  const parsedParams = courseIdParamsSchema.safeParse(req.params);

  if (!parsedParams.success) {
    res.status(400).json({
      message: "Invalid course ID",
      errors: z.flattenError(parsedParams.error),
    });

    return;
  }

  const deletedCourse = await deleteCourse(parsedParams.data.id);

  if (!deletedCourse) {
    res.status(404).json({
      message: "Course not found",
    });

    return;
  }

  res.status(204).send();
}

export async function getCourseOptionsController(
  req: Request,
  res: Response,
) {
  const options = await getCourseOptions();

  res.status(200).json(options);
}