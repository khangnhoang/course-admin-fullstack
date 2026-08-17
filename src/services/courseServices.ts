import { initialCourses } from "../data/courses";
import type { Course, CourseList } from "../types/course";
import type { Topic } from "../types/topics";
import { initialTopics } from "../data/topics";
import { delay } from "../utils/delay";

export async function getCourses(): Promise<CourseList> {
  await delay();

  return [...initialCourses];
}

export async function getTopics(): Promise<Topic[]> {
  await delay();

  return [...initialTopics];
}

export async function createCourses(course: Course) {
  await delay();

  initialCourses.push(course);
}

export async function updateCourse(updatedCourse: Course) {
  await delay();

  const index = initialCourses.findIndex(
    (course) => course.id === updatedCourse.id,
  );

  if (index === -1) {
    throw new Error("course not found");
  }

  initialCourses[index] = updatedCourse;
}

export async function deleteCourse(id: string) {
  await delay();

  const index = initialCourses.findIndex((course) => course.id === id);

  if (index === -1) {
    throw new Error("Course not found");
  }

  initialCourses.splice(index, 1);
}


