import type {
  Course,
  CourseList,
  CreateCourseInput,
  UpdateCourseInput,
} from "../types/course";
const COURSE_API_URL = "http://localhost:3000/api/courses";

export async function getCourses(): Promise<CourseList> {
  const response = await fetch(COURSE_API_URL);

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
