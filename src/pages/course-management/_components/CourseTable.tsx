import { Eye, Pencil, Trash2 } from "lucide-react";
import type { Course } from "../../../types/course";

type CourseTableProps = {
  courses: Course[];
  onViewCourse: (id: string) => void;
  onEditCourse: (course: Course) => void;
  onDeleteCourse: (id: string) => void;
};

function getStatusClasses(status: Course["status"]) {
  switch (status) {
    case "published":
      return "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20";
    case "draft":
      return "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20";
    case "archived":
      return "bg-slate-500/10 text-slate-300 ring-1 ring-slate-500/20";
    default:
      return "bg-slate-500/10 text-slate-300 ring-1 ring-slate-500/20";
  }
}

export function CourseTable({
  courses,
  onViewCourse,
  onEditCourse,
  onDeleteCourse,
}: CourseTableProps) {
  return (
    <div className="mx-auto mt-6 w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 shadow-lg shadow-black/20">
      <table className="min-w-full table-fixed">
        <thead className="bg-slate-900/80">
          <tr className="border-b border-slate-800">
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Title
            </th>
            <th className="w-40 px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Status
            </th>
            <th className="w-52 px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Created At
            </th>
            <th className="w-40 px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {courses.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="px-6 py-12 text-center text-sm text-slate-400"
              >
                No courses found.
              </td>
            </tr>
          ) : (
            courses.map((course) => (
              <tr
                key={course.id}
                className="border-b border-slate-800/80 transition hover:bg-slate-800/40 last:border-b-0"
              >
                <td className="px-6 py-4 align-middle">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-100">
                      {course.title}
                    </p>
                    <p className="mt-1 truncate text-xs text-slate-500">
                      {course.id}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-4 align-middle">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${getStatusClasses(course.status)}`}
                  >
                    {course.status}
                  </span>
                </td>

                <td className="px-6 py-4 align-middle text-sm text-slate-300">
                  {new Date(course.createdAt).toLocaleDateString("en-GB")}
                </td>

                <td className="px-6 py-4 align-middle">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => onViewCourse(course.id)}
                      className="rounded-lg p-2 text-emerald-400 transition hover:bg-slate-800 hover:text-emerald-300"
                      aria-label={`View ${course.title}`}
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onEditCourse(course)}
                      className="rounded-lg p-2 text-indigo-400 transition hover:bg-slate-800 hover:text-indigo-300"
                      aria-label={`Edit ${course.title}`}
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteCourse(course.id)}
                      className="rounded-lg p-2 text-rose-400 transition hover:bg-slate-800 hover:text-rose-300"
                      aria-label={`Delete ${course.title}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}