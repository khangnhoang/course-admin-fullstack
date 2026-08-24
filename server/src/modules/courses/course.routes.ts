import { Router } from "express";

import {
  getCourseByIdController,
  getCoursesController,
} from "./course.controller.js";

const courseRouter = Router();

courseRouter.get("/", getCoursesController);
courseRouter.get("/:id", getCourseByIdController);

export { courseRouter };