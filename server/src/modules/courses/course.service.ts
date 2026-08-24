import {
  findAllCourses,
  findCourseById,
} from "./course.repository.js";

export async function getCourses() {
  return findAllCourses();
}

export async function getCourseById(id: string) {
  return findCourseById(id);
}