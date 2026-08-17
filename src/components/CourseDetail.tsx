import type { Course } from "../types/course";
import type { Topic } from "../types/topics";
import { X } from "lucide-react";

type CourseDetailProps = {
  course: Course;
  topics: Topic[];
  onClose: () => void;
  onMoveTopic: (topicId: string, direction: "up" | "down") => void;
};

export function CourseDetail({
  course,
  topics,
  onClose,
  onMoveTopic,
}: CourseDetailProps) {
  return (
    <section className="w-full max-w-3xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">Course detail</p>

          <h2 className="text-2xl font-bold text-gray-800">{course.title}</h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer rounded-md p-2 text-gray-500 hover:bg-gray-100"
          aria-label="Close course detail"
        >
          <X size={20} />
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-gray-50 p-4">
          <p className="text-sm text-gray-500">Course ID</p>

          <p className="font-medium text-gray-800">{course.id}</p>
        </div>

        <div className="rounded-lg bg-gray-50 p-4">
          <p className="text-sm text-gray-500">Status</p>

          <p className="font-medium capitalize text-gray-800">
            {course.status}
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-4 sm:col-span-2">
          <p className="text-sm text-gray-500">Created at</p>

          <p className="font-medium text-gray-800">{course.createdAt}</p>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Topics</p>

            <h3 className="text-xl font-semibold text-gray-800">
              Course topics
            </h3>
          </div>

          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
            {topics.length} topics
          </span>
        </div>

        {topics.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-gray-500">
            No topics in this course yet.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
              >
                <div>
                  <p className="font-medium text-gray-800">{topic.title}</p>

                  <p className="text-sm text-gray-500">
                    Order: {topic.orderIndex}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onMoveTopic(topic.id, "up")}
                    className="rounded-md border px-2 py-1 hover:bg-gray-100"
                  >
                    ↑
                  </button>

                  <button
                    type="button"
                    onClick={() => onMoveTopic(topic.id, "down")}
                    className="rounded-md border px-2 py-1 hover:bg-gray-100"
                  >
                    ↓
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
