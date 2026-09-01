import { Router } from "express";

import {
  getCourseByIdController,
  getCoursesController,
  createCourseController,
  updateCourseController,
  deleteCourseController,
} from "./course.controller.js";

import {
  createTopicController,
  getTopicsByCourseIdController,
} from "../topics/topic.controller.js";

const courseRouter = Router();

courseRouter.get("/", getCoursesController);
courseRouter.get("/:id", getCourseByIdController);
courseRouter.post("/", createCourseController);
courseRouter.patch("/:id", updateCourseController);
courseRouter.delete("/:id", deleteCourseController);

courseRouter.get(
  "/:courseId/topics",
  getTopicsByCourseIdController,
);

courseRouter.post(
  "/:courseId/topics",
  createTopicController,
);

export { courseRouter };