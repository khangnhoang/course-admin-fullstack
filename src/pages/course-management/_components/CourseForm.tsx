import { useState } from "react";
import type {
  Course,
  CourseStatus,
  CreateCourseInput,
  UpdateCourseInput,
} from "../../../types/course";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CourseFormProps = {
  onCreateCourse: (course: CreateCourseInput) => Promise<void>;
  editingCourse: Course | null;
  onUpdateCourse: (id: string, input: UpdateCourseInput) => Promise<void>;
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
      const input: UpdateCourseInput = {
        title: trimmedTitle,
        status,
      };

      await onUpdateCourse(editingCourse.id, input);
      return;
    }

    const newCourse: CreateCourseInput = {
      title: trimmedTitle,
      status,
    };

    await onCreateCourse(newCourse);

    setTitle("");
    setStatus("draft");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Field>
        <FieldLabel htmlFor="title">Course title</FieldLabel>

        <Input
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter course title"
          className="border-slate-700 bg-slate-900 text-slate-100"
        />
      </Field>

      <Field>
        <FieldLabel>Status</FieldLabel>

        <Select
          value={status}
          onValueChange={(value) => setStatus(value as CourseStatus)}
        >
          <SelectTrigger className="w-full rounded-lg border-slate-700 bg-slate-900 text-slate-100">
            <SelectValue />
          </SelectTrigger>

          <SelectContent className="rounded-lg border-slate-700 bg-slate-900 text-slate-100">
            <SelectItem value="draft" className="rounded-md">
              Draft
            </SelectItem>

            <SelectItem value="published" className="rounded-md">
              Published
            </SelectItem>

            <SelectItem value="archived" className="rounded-md">
              Archived
            </SelectItem>
          </SelectContent>
        </Select>
      </Field>

      {error && <p className="text-sm text-rose-400">{error}</p>}

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancelEdit}
          className="border-slate-700 bg-transparent text-slate-200 hover:bg-slate-800"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          className="bg-indigo-500 text-white hover:bg-indigo-400"
        >
          {editingCourse ? "Save changes" : "Create course"}
        </Button>
      </div>
    </form>
  );
}
