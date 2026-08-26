import { Router } from "express";

import {
  getCourseByIdController,
  getCoursesController,
  createCourseController,
  updateCourseController,
  deleteCourseController,
} from "./course.controller.js";

const courseRouter = Router();

courseRouter.get("/", getCoursesController);
courseRouter.get("/:id", getCourseByIdController);
courseRouter.post("/", createCourseController);
courseRouter.patch("/:id", updateCourseController);
courseRouter.delete("/:id", deleteCourseController);

export { courseRouter };