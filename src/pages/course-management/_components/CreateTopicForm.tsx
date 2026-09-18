import type { CourseOption } from "../../../types/course";
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
    <form
  onSubmit={handleSubmit}
  className="flex flex-col gap-6"
>
  <Field>
    <FieldLabel htmlFor="topic-title">
      Topic title
    </FieldLabel>

    <Input
      id="topic-title"
      value={title}
      onChange={(event) =>
        onTitleChange(event.target.value)
      }
      placeholder="Enter topic title"
      className="border-slate-700 bg-slate-900 text-slate-100"
    />
  </Field>

  <Field>
    <FieldLabel>Course</FieldLabel>

    <Select
      value={courseId}
      onValueChange={(value) =>
        onCourseChange(value ?? "")
      }
    >
      <SelectTrigger className="w-full border-slate-700 bg-slate-900 text-slate-100">
        <SelectValue placeholder="Select course" />
      </SelectTrigger>

      <SelectContent className="border-slate-700 bg-slate-900 text-slate-100">
        {courses.map((course) => (
          <SelectItem
            key={course.id}
            value={course.id}
          >
            {course.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </Field>

  <div className="flex justify-end gap-3">
    <Button
      type="button"
      variant="outline"
      onClick={onClose}
    >
      Cancel
    </Button>

    <Button
      type="submit"
      className="bg-indigo-500 text-white hover:bg-indigo-400"
    >
      Create topic
    </Button>
  </div>
</form>
  );
}