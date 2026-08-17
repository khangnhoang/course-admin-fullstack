import type { Course, CourseStatus } from "../types/course";
import { Pencil, Trash2, Eye } from "lucide-react";

type CourseTableProps = {
  courses: Course[];
  onEditCourse: (course: Course) => void;
  onDeleteCourse: (id: string) => void;
  onViewCourse: (id: string) => void;
};

type StatusBadgeProps = {
  status: CourseStatus;
};

function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`status status--${status}`}>{status}</span>;
}

export function CourseTable({
  courses,
  onEditCourse,
  onDeleteCourse,
  onViewCourse
}: CourseTableProps) {
  if (courses.length === 0) {
    return <p>No courses found.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Status</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {courses.map((course) => (
          <tr key={course.id}>
            <td>{course.title}</td>
            <td>
              <StatusBadge status={course.status} />
            </td>
            <td>{course.createdAt}</td>

            <td>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onViewCourse(course.id)}
                  className="cursor-pointer rounded-md p-2 text-green-600 hover:bg-green-100"
                  aria-label={`View ${course.title}`}
                >
                  <Eye size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => onEditCourse(course)}
                  className="cursor-pointer rounded-md p-2 text-blue-600 hover:bg-blue-100"
                  aria-label={`Edit ${course.title}`}
                >
                  <Pencil size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => onDeleteCourse(course.id)}
                  className="cursor-pointer rounded-md p-2 text-red-600 hover:bg-red-100"
                  aria-label={`Delete ${course.title}`}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
