export type CourseStatus = "draft" | "published" | "archived";

export type Course = {
  id: string;
  title: string;
  status: CourseStatus;
  createdAt: string;
};

export type CourseList = Course[];

export type SortOrder = "title-asc" | "title-desc" | "newest" | "oldest";

export type CreateCourseInput = Pick<Course, "title" | "status">;

export type UpdateCourseInput = Partial<Pick<Course, "title" | "status">>;
