import type { CourseStatus } from "../../../types/course";
import type { SortOrder } from "../../../types/course";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CourseFiltersProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: CourseStatus | "all";
  onStatusFilterChange: (value: CourseStatus | "all") => void;
  sortOrder: SortOrder;
  onSortChange: (value: SortOrder) => void;
};

export function CourseFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortOrder,
  onSortChange,
}: CourseFiltersProps) {
  const statusItems = [
    { value: "all", label: "All status" },
    { value: "draft", label: "Draft" },
    { value: "published", label: "Published" },
    { value: "archived", label: "Archived" },
  ];

  const sortItems = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "title-asc", label: "Title A-Z" },
    { value: "title-desc", label: "Title Z-A" },
  ];

  return (
    <div className="flex w-full max-w-3xl items-center gap-3 py-4">
      <input
        type="search"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search courses..."
        className="flex-1 rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
      />

      <Select
        items={statusItems}
        value={statusFilter}
        onValueChange={(value) =>
          onStatusFilterChange(value as CourseStatus | "all")
        }
      >
        <SelectTrigger
          className="
      w-40
      rounded-lg
      border-slate-700
      bg-slate-950
      text-base
      text-slate-100
      data-[size=default]:h-10
    "
        >
          <SelectValue />
        </SelectTrigger>

        <SelectContent className="rounded-lg border-slate-700 bg-slate-900 text-slate-100">
          {statusItems.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              className="rounded-md"
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        items={sortItems}
        value={sortOrder}
        onValueChange={(value) => onSortChange(value as SortOrder)}
      >
        <SelectTrigger
          className="
      w-40
      rounded-lg
      border-slate-700
      bg-slate-950
      text-base
      text-slate-100
      data-[size=default]:h-10
    "
        >
          <SelectValue />
        </SelectTrigger>

        <SelectContent className="rounded-lg border-slate-700 bg-slate-900 text-slate-100">
          {statusItems.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              className="rounded-md"
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
