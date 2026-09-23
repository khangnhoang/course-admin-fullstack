import type { Course } from "../../../types/course";
import type { Topic } from "../../../types/topics";
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
    <section className="w-full max-w-3xl rounded-xl border border-slate-800 bg-slate-950 p-6 text-slate-100 shadow-xl shadow-black/20">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400">Course detail</p>

          <h2 className="mt-1 text-2xl font-bold text-slate-100">
            {course.title}
          </h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-slate-100"
          aria-label="Close course detail"
        >
          <X size={20} />
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-sm text-slate-400">Course ID</p>

          <p className="mt-1 break-all font-medium text-slate-100">
            {course.id}
          </p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-sm text-slate-400">Status</p>

          <p className="mt-1 font-medium capitalize text-slate-100">
            {course.status}
          </p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 sm:col-span-2">
          <p className="text-sm text-slate-400">Created at</p>

          <p className="mt-1 font-medium text-slate-100">{course.createdAt}</p>
        </div>
      </div>

      <div className="mt-6 border-t border-slate-800 pt-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Topics</p>

            <h3 className="mt-1 text-xl font-semibold text-slate-100">
              Course topics
            </h3>
          </div>

          <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-sm text-slate-300">
            {topics.length} topics
          </span>
        </div>

        {topics.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-700 p-6 text-center text-slate-400">
            No topics in this course yet.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/60 p-4 transition hover:bg-slate-900"
              >
                <div>
                  <p className="font-medium text-slate-100">{topic.title}</p>

                  <p className="mt-1 text-sm text-slate-400">
                    Order: {topic.orderIndex}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onMoveTopic(topic.id, "up")}
                    className="cursor-pointer rounded-lg border border-slate-700 px-3 py-1.5 text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white"
                    aria-label={`Move ${topic.title} up`}
                  >
                    ↑
                  </button>

                  <button
                    type="button"
                    onClick={() => onMoveTopic(topic.id, "down")}
                    className="cursor-pointer rounded-lg border border-slate-700 px-3 py-1.5 text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white"
                    aria-label={`Move ${topic.title} down`}
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
