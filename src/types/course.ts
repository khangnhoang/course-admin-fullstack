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

export type CourseStatusFilter = CourseStatus | "all";

export type CourseListQuery = {
  search?: string;
  status?: CourseStatus;
  sort: SortOrder;
  page: number;
  limit: number;
};

export type CoursePagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type CourseListResponse = {
  data: Course[];
  pagination: CoursePagination;
};

export type CourseOption = {
  id: string;
  title: string;
};