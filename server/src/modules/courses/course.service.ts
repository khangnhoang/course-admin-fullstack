import {
  findAllCourses,
  findCourseById,
  createCourseRecord,
  updateCourseById,
  deleteCourseById,
} from "./course.repository.js";

import type { CreateCourseInput, UpdateCourseInput } from "./course.schema.js";

export async function getCourses() {
  return findAllCourses();
}

export async function getCourseById(id: string) {
  return findCourseById(id);
}

export async function createCourse(input: CreateCourseInput) {
  return createCourseRecord(input);
}

export async function updateCourse(id: string, input: UpdateCourseInput) {
  return updateCourseById(id, input);
}

export async function deleteCourse(id: string) {
  return deleteCourseById(id);
}