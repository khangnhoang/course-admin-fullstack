import type {
  Course,
  CreateCourseInput,
  UpdateCourseInput,
  CourseListQuery,
  CourseListResponse,
  CourseOption,
} from "../types/course";

import { API_URL } from "../config/api";

const COURSE_API_URL = `${API_URL}/api/courses`;

export async function getCourses(
  query: CourseListQuery,
): Promise<CourseListResponse> {
  const params = new URLSearchParams();

  if (query.search) {
    params.set("search", query.search);
  }

  if (query.status) {
    params.set("status", query.status);
  }

  params.set("sort", query.sort);
  params.set("page", String(query.page));
  params.set("limit", String(query.limit));

  const response = await fetch(
    `${COURSE_API_URL}?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }

  return response.json();
}

export async function createCourses(input: CreateCourseInput): Promise<Course> {
  const response = await fetch(COURSE_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("Failed to create course");
  }

  return response.json();
}

export async function updateCourse(
  id: string,
  input: UpdateCourseInput,
): Promise<Course> {
  const response = await fetch(`${COURSE_API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("Failed to update course");
  }

  return response.json();
}

export async function deleteCourse(id: string): Promise<void> {
  const response = await fetch(`${COURSE_API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete course");
  }
}

export async function getCourseOptions(): Promise<CourseOption[]> {
  const response = await fetch(`${COURSE_API_URL}/options`);

  if (!response.ok) {
    throw new Error("Failed to fetch course options");
  }

  return response.json();
}