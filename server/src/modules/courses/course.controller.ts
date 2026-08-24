import type { Request, Response } from "express";

import {
  getCourseById,
  getCourses,
} from "./course.service.js";

export async function getCoursesController(
  _req: Request,
  res: Response,
) {
  const courses = await getCourses();

  res.status(200).json(courses);
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