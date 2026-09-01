import { useEffect, useState } from "react";
import { CourseTable } from "./components/CourseTable";
import type {
  Course,
  CourseStatus,
  CreateCourseInput,
  UpdateCourseInput,
} from "./types/course";
import { CourseForm } from "./components/CourseForm";
import {
  createCourses,
  deleteCourse,
  getCourses,
  updateCourse,
} from "./services/courseServices";
import {
  createTopic,
  getTopicsByCourseId,
  updateTopic,
} from "./services/topicServices";
import type { Topic } from "./types/topics";
import { CourseFilters } from "./components/CourseFilter";
import { CourseDetail } from "./components/CourseDetail";
import { CreateTopicForm } from "./components/CreateTopicForm";
import type { SortOrder } from "./types/course";

function App() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [showCourses, setShowCourses] = useState(true);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [refreshKey, setRefreshKey] = useState(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<CourseStatus | "all">("all");

  const [sortOrder, setSortOrder] = useState<SortOrder>("title-asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [courseDetailId, setCourseDetailId] = useState<string | null>(null);

  const [topics, setTopics] = useState<Topic[]>([]);

  const [createTopicTitle, setCreateTopicTitle] = useState("");
  const [createTopicCourseId, setCreateTopicCourseId] = useState("");
  const [isCreateTopic, setIsCreateTopic] = useState(false);

  const courseDetail = courses.find((course) => course.id === courseDetailId);

  const courseDetailTopics = topics
    .filter((topic) => topic.courseId === courseDetailId)
    .sort((a, b) => a.orderIndex - b.orderIndex);

  const pageSize = 5;

  const filteredCourses = courses
    .filter((course) =>
      course.title
        .trim()
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase()),
    )
    .filter((course) =>
      statusFilter === "all" ? true : course.status === statusFilter,
    );

  const displayedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortOrder) {
      case "title-asc":
        return a.title.localeCompare(b.title);

      case "title-desc":
        return b.title.localeCompare(a.title);

      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

      case "oldest":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
    }
  });

  const totalPages = Math.ceil(displayedCourses.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;

  const endIndex = startIndex + pageSize;

  const paginatedCourses = displayedCourses.slice(startIndex, endIndex);

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

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const coursesData = await getCourses();

        setCourses(coursesData);
        setErrorMessage(null);
      } catch {
        setErrorMessage("Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };

    void loadCourses();
  }, [refreshKey]);

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
  };

  const handleCreateCourse = async (course: CreateCourseInput) => {
    try {
      await createCourses(course);

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

  const handleCancelEdit = () => {
    setEditingCourse(null);
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

  const handleCloseCreateTopicModal = () => {
    setIsCreateTopic(false);
  };

  const handleMoveTopic = async (topicId: string, direction: "up" | "down") => {
    const currentTopic = topics.find((topic) => topic.id === topicId);

    if (!currentTopic) {
      return;
    }

    const courseTopics = topics
      .filter((topic) => topic.courseId === currentTopic.courseId)
      .sort((a, b) => a.orderIndex - b.orderIndex);

    const currentIndex = courseTopics.findIndex(
      (topic) => topic.id === topicId,
    );

    const targetIndex =
      direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (targetIndex < 0 || targetIndex >= courseTopics.length) {
      return;
    }

    const targetTopic = courseTopics[targetIndex];

    const currentOrderIndex = currentTopic.orderIndex;
    const targetOrderIndex = targetTopic.orderIndex;

    await updateTopic(currentTopic.id, {
      orderIndex: targetOrderIndex,
    });

    await updateTopic(targetTopic.id, {
      orderIndex: currentOrderIndex,
    });

    prepareLoad();
    setRefreshKey((current) => current + 1);
  };

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-600">
        Course Admin Dashboard
      </h1>

      {isCreateTopic && (
        <CreateTopicForm
          title={createTopicTitle}
          courseId={createTopicCourseId}
          courses={courses}
          onTitleChange={setCreateTopicTitle}
          onCourseChange={setCreateTopicCourseId}
          onCreate={handleCreateTopic}
          onClose={handleCloseCreateTopicModal}
        />
      )}

      {courseDetail && (
        <CourseDetail
          course={courseDetail}
          topics={courseDetailTopics}
          onClose={() => setCourseDetailId(null)}
          onMoveTopic={handleMoveTopic}
        />
      )}

      <CourseForm
        key={editingCourse?.id ?? "create"}
        onCreateCourse={handleCreateCourse}
        editingCourse={editingCourse}
        onUpdateCourse={handleUpdateCourse}
        onCancelEdit={handleCancelEdit}
      />

      <p>Total courses: {courses.length}</p>

      <button type="button" onClick={() => setIsCreateTopic(true)}>
        Create Topic
      </button>

      <div className="btn-container">
        <button onClick={() => setShowCourses((current) => !current)}>
          {showCourses ? "Hide courses" : "Show courses"}
        </button>
      </div>

      <CourseFilters
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        statusFilter={statusFilter}
        onStatusFilterChange={handleStatusChange}
        onSortChange={handleSortChange}
        sortOrder={sortOrder}
      />

      {showCourses && (
        <CourseTable
          courses={paginatedCourses}
          onEditCourse={handleEditCourse}
          onDeleteCourse={handleDeleteCourse}
          onViewCourse={setCourseDetailId}
        />
      )}

      <div className="flex items-center gap-3 py-4">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((current) => current - 1)}
        >
          Previous
        </button>

        <span>
          Page {currentPage} / {totalPages}
        </span>

        <button
          type="button"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage((current) => current + 1)}
        >
          Next
        </button>
      </div>
    </main>
  );
}

export default App;
