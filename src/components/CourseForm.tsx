import { useState } from "react";
import type { Course, CourseStatus } from "../types/course";

type CourseFormProps = {
  onCreateCourse: (course: Course) => Promise<void>;
  editingCourse: Course | null;
  onUpdateCourse: (course: Course) => Promise<void>;
  onCancelEdit: () => void;
};

export function CourseForm({
  onCreateCourse,
  editingCourse,
  onUpdateCourse,
  onCancelEdit,
}: CourseFormProps) {
  const [title, setTitle] = useState(editingCourse?.title || "");
  const [status, setStatus] = useState<CourseStatus>(
    editingCourse?.status || "draft",
  );
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Course title is required.");
      return;
    }

    if (editingCourse) {
      const updatedCourse = {
        ...editingCourse,
        title: trimmedTitle,
        status,
      };

      await onUpdateCourse(updatedCourse);
      return;
    }

    const newCourse: Course = {
      id: crypto.randomUUID(),
      title: trimmedTitle,
      status,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    await onCreateCourse(newCourse);

    setTitle("");
    setStatus("draft");
    setError("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-blue-400 p-12 rounded-xl text-white text-xl flex flex-col gap-4"
    >
      <div className="grid grid-cols-[140px_1fr] items-center gap-3">
        <label htmlFor="title">Course title:</label>

        <input
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="rounded-sm bg-white px-2 py-1 text-blue-400 outline-none"
        />
      </div>

      <div className="grid grid-cols-[140px_1fr] items-center gap-3">
        <label htmlFor="status">Status:</label>

        <select
          id="status"
          value={status}
          onChange={(event) => setStatus(event.target.value as CourseStatus)}
          className="rounded-sm bg-white px-2 py-1 text-blue-400 outline-none"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {error && <p>{error}</p>}

      <div className="flex justify-center gap-3">
        <button
          className="bg-white w-[30%] self-center rounded-sm text-blue-400 hover:opacity-80 cursor-pointer"
          type="submit"
        >
          {editingCourse ? "Edit course" : "Create course"}
        </button>

        {editingCourse && (
          <button
            className="bg-white w-[30%] self-center rounded-sm text-blue-400 hover:opacity-80 cursor-pointer"
            type="button"
            onClick={onCancelEdit}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
