import { useEffect, useState } from "react";
import { CourseTable } from "./_components/CourseTable";
import type {
  Course,
  CourseOption,
  CourseStatus,
  CreateCourseInput,
  UpdateCourseInput,
} from "../../types/course";
import { CourseForm } from "./_components/CourseForm";
import {
  createCourses,
  deleteCourse,
  getCourseOptions,
  getCourses,
  updateCourse,
} from "../../services/courseServices";
import {
  createTopic,
  getTopicsByCourseId,
  moveTopic,
} from "../../services/topicServices";
import type { Topic } from "../../types/topics";
import { CourseFilters } from "./_components/CourseFilter";
import { CourseDetail } from "./_components/CourseDetail";
import { CreateTopicForm } from "./_components/CreateTopicForm";
import type { SortOrder } from "../../types/course";
import type { TopicMoveDirection } from "../../types/topics";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function CourseManagementPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [refreshKey, setRefreshKey] = useState(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<CourseStatus | "all">("all");

  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [courseDetailId, setCourseDetailId] = useState<string | null>(null);

  const [topics, setTopics] = useState<Topic[]>([]);

  const [createTopicTitle, setCreateTopicTitle] = useState("");
  const [createTopicCourseId, setCreateTopicCourseId] = useState("");
  const [isCreateTopic, setIsCreateTopic] = useState(false);

  const [totalCourses, setTotalCourses] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [courseOptions, setCourseOptions] = useState<CourseOption[]>([]);

  const [isCourseFormOpen, setIsCourseFormOpen] = useState(false);

  const pageSize = 10;

  const courseDetail = courses.find((course) => course.id === courseDetailId);

  const courseDetailTopics = topics
    .filter((topic) => topic.courseId === courseDetailId)
    .sort((a, b) => a.orderIndex - b.orderIndex);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: CourseStatus | "all") => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: SortOrder) => {
    setSortOrder(value);
    setCurrentPage(1);
  };

  const handleOpenCreateCourse = () => {
    setEditingCourse(null);
    setIsCourseFormOpen(true);
  };

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const result = await getCourses({
          search: searchTerm.trim() || undefined,
          status: statusFilter === "all" ? undefined : statusFilter,
          sort: sortOrder,
          page: currentPage,
          limit: pageSize,
        });

        setCourses(result.data);
        setTotalCourses(result.pagination.total);
        setTotalPages(result.pagination.totalPages);
        setErrorMessage(null);
      } catch {
        setErrorMessage("Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };

    void loadCourses();
  }, [refreshKey, searchTerm, statusFilter, sortOrder, currentPage]);

  useEffect(() => {
    const loadTopics = async () => {
      if (!courseDetailId) {
        setTopics([]);
        return;
      }

      try {
        const topicsData = await getTopicsByCourseId(courseDetailId);

        setTopics(topicsData);
      } catch {
        setErrorMessage("Failed to load topics");
      }
    };

    void loadTopics();
  }, [courseDetailId, refreshKey]);

  useEffect(() => {
    const loadCourseOptions = async () => {
      try {
        const options = await getCourseOptions();
        setCourseOptions(options);
      } catch {
        setErrorMessage("Failed to load course options");
      }
    };

    void loadCourseOptions();
  }, [refreshKey]);

  const prepareLoad = () => {
    setIsLoading(true);
    setErrorMessage(null);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (errorMessage) {
    return <p>error: {errorMessage}</p>;
  }

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setIsCourseFormOpen(true);
  };

  const handleCloseCourseForm = () => {
    setEditingCourse(null);
    setIsCourseFormOpen(false);
  };

  const handleCreateCourse = async (course: CreateCourseInput) => {
    try {
      await createCourses(course);

      setIsCourseFormOpen(false);
      prepareLoad();
      setRefreshKey((current) => current + 1);
    } catch {
      setErrorMessage("failed to create course");
    }
  };

  const handleUpdateCourse = async (id: string, input: UpdateCourseInput) => {
    try {
      await updateCourse(id, input);

      setEditingCourse(null);
      setIsCourseFormOpen(false);

      prepareLoad();
      setRefreshKey((current) => current + 1);
    } catch {
      setErrorMessage("update course error");
    }
  };

  const handleDeleteCourse = async (id: string) => {
    const isConfirmed = window.confirm("delete this course?");

    if (!isConfirmed) {
      return;
    }

    try {
      await deleteCourse(id);

      if (editingCourse?.id === id) {
        setEditingCourse(null);
      }

      if (courseDetailId === id) {
        setCourseDetailId(null);
      }

      prepareLoad();
      setRefreshKey((current) => current + 1);
    } catch {
      setErrorMessage("delete course error");
    }
  };

  const handleCreateTopic = async () => {
    const trimmedTitle = createTopicTitle.trim();

    if (!trimmedTitle || !createTopicCourseId) {
      return;
    }

    try {
      await createTopic(createTopicCourseId, {
        title: trimmedTitle,
      });

      setCreateTopicTitle("");
      setCreateTopicCourseId("");
      setIsCreateTopic(false);

      prepareLoad();
      setRefreshKey((current) => current + 1);
    } catch {
      setErrorMessage("Failed to create topic");
    }
  };

  const handleMoveTopic = async (
    topicId: string,
    direction: TopicMoveDirection,
  ) => {
    try {
      await moveTopic(topicId, direction);

      prepareLoad();
      setRefreshKey((current) => current + 1);
    } catch {
      setErrorMessage("Failed to move topic");
    }
  };

  return (
    <main className="min-h-[calc(100vh-73px)] bg-slate-950 px-6 py-10 text-slate-100">
      <div className="mx-auto max-w-6xl">
        {/* Page header */}
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-indigo-400">Admin</p>

            <h1 className="mt-1 text-3xl font-semibold">Course Management</h1>

            <p className="mt-2 text-sm text-slate-400">
              Manage courses and their topics.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsCreateTopic(true)}
              className="
              rounded-xl border border-slate-700
              px-4 py-2.5 text-sm font-medium text-slate-200
              transition hover:bg-slate-800
            "
            >
              Create Topic
            </button>

            <button
              type="button"
              onClick={handleOpenCreateCourse}
              className="
              rounded-xl bg-indigo-500
              px-4 py-2.5 text-sm font-medium text-white
              transition hover:bg-indigo-400
            "
            >
              Create Course
            </button>
          </div>
        </div>

        {/* Count */}
        <p className="mb-3 text-sm text-slate-400">{totalCourses} courses</p>

        {/* Filters */}
        <CourseFilters
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          statusFilter={statusFilter}
          onStatusFilterChange={handleStatusChange}
          onSortChange={handleSortChange}
          sortOrder={sortOrder}
        />

        {/* Table */}
        <CourseTable
          courses={courses}
          onEditCourse={handleEditCourse}
          onDeleteCourse={handleDeleteCourse}
          onViewCourse={setCourseDetailId}
        />

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((current) => current - 1)}
            className="
            rounded-lg border border-slate-700
            px-4 py-2 text-sm text-slate-300
            transition hover:bg-slate-800
            disabled:cursor-not-allowed disabled:opacity-40
          "
          >
            Previous
          </button>

          <span className="text-sm text-slate-400">
            Page {currentPage} / {totalPages}
          </span>

          <button
            type="button"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((current) => current + 1)}
            className="
            rounded-lg border border-slate-700
            px-4 py-2 text-sm text-slate-300
            transition hover:bg-slate-800
            disabled:cursor-not-allowed disabled:opacity-40
          "
          >
            Next
          </button>
        </div>
      </div>

      {/* Create / Edit Course modal */}
      <Dialog
        open={isCourseFormOpen}
        onOpenChange={(open) => {
          if (!open) {
            handleCloseCourseForm();
          }
        }}
      >
        <DialogContent className="w-[calc(100%-2rem)] sm:max-w-3xl rounded-2xl border border-slate-800 bg-slate-950 text-slate-100">
          <DialogHeader>
            <DialogTitle>
              {editingCourse ? "Edit course" : "Create course"}
            </DialogTitle>

            <DialogDescription className="text-slate-400">
              {editingCourse
                ? "Update the course information."
                : "Create a new course."}
            </DialogDescription>
          </DialogHeader>

          <CourseForm
            key={editingCourse?.id ?? "create"}
            editingCourse={editingCourse}
            onCreateCourse={handleCreateCourse}
            onUpdateCourse={handleUpdateCourse}
            onCancelEdit={handleCloseCourseForm}
          />
        </DialogContent>
      </Dialog>

      {/* Create Topic modal */}
      <Dialog
        open={isCreateTopic}
        onOpenChange={(open) => {
          if (!open) {
            setIsCreateTopic(false);
          }
        }}
      >
        <DialogContent className="w-[calc(100%-2rem)] sm:max-w-3xl rounded-2xl border-slate-800 bg-slate-950 text-slate-100">
          <DialogHeader>
            <DialogTitle>Create topic</DialogTitle>

            <DialogDescription className="text-slate-400">
              Add a new topic to a course.
            </DialogDescription>
          </DialogHeader>

          <CreateTopicForm
            title={createTopicTitle}
            courseId={createTopicCourseId}
            courses={courseOptions}
            onTitleChange={setCreateTopicTitle}
            onCourseChange={setCreateTopicCourseId}
            onCreate={handleCreateTopic}
            onClose={() => setIsCreateTopic(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Course Detail modal */}
      {courseDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <CourseDetail
            course={courseDetail}
            topics={courseDetailTopics}
            onClose={() => setCourseDetailId(null)}
            onMoveTopic={handleMoveTopic}
          />
        </div>
      )}
    </main>
  );
}
export default CourseManagementPage;
