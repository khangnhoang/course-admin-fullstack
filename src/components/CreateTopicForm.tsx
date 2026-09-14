import type { CourseOption } from "../types/course";
import { X } from "lucide-react";

type CreateTopicFormProps = {
  title: string;
  courseId: string;
  courses: CourseOption[];

  onTitleChange: (value: string) => void;
  onCourseChange: (value: string) => void;

  onCreate: () => Promise<void>;
  onClose: () => void;
};

export function CreateTopicForm({
  title,
  courseId,
  courses,
  onTitleChange,
  onCourseChange,
  onCreate,
  onClose,
}: CreateTopicFormProps) {
  const handleSubmit = async (
    event: React.SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    await onCreate();
  };

  return (
    <section className="w-full max-w-3xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">
            Topic management
          </p>

          <h2 className="text-2xl font-bold text-gray-800">
            Create topic
          </h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer rounded-md p-2 text-gray-500 hover:bg-gray-100"
          aria-label="Close create topic form"
        >
          <X size={20} />
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="topic-title"
            className="font-medium text-gray-700"
          >
            Topic title
          </label>

          <input
            id="topic-title"
            type="text"
            value={title}
            onChange={(event) =>
              onTitleChange(event.target.value)
            }
            placeholder="Enter topic title"
            className="rounded-md border border-gray-300 px-3 py-2 text-gray-800 outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="topic-course"
            className="font-medium text-gray-700"
          >
            Course
          </label>

          <select
            id="topic-course"
            value={courseId}
            onChange={(event) =>
              onCourseChange(event.target.value)
            }
            className="rounded-md border border-gray-300 px-3 py-2 text-gray-800 outline-none focus:border-blue-500"
          >
            <option value="">
              Select course
            </option>

            {courses.map((course) => (
              <option
                key={course.id}
                value={course.id}
              >
                {course.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-md border border-gray-300 px-4 py-2 text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            Create topic
          </button>
        </div>
      </form>
    </section>
  );
}