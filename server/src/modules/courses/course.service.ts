import {
  findCourses,
  findCourseById,
  createCourseRecord,
  updateCourseById,
  deleteCourseById,
  countCourses,
  findCourseOptions,
} from "./course.repository.js";

import type {
  CreateCourseInput,
  UpdateCourseInput,
  CourseListQuery,
} from "./course.schema.js";

export async function getCourseOptions() {
  return findCourseOptions();
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

export async function getCourses(query: CourseListQuery) {
  const [courses, total] = await Promise.all([
    findCourses(query),
    countCourses(query),
  ]);

  return {
    data: courses,
    pagination: {
      page: query.page,
      limit: query.limit,
      total,
      totalPages: Math.ceil(total / query.limit),
    },
  };
}
