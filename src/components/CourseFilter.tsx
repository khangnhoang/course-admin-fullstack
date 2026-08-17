import type { CourseStatus } from "../types/course";
import type { SortOrder } from "../types/course";

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
  return (
    <div className="flex w-full max-w-3xl items-center gap-3 py-4">
      <input
        type="search"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search courses..."
        className="flex-1 rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
      />

      <select
        value={statusFilter}
        onChange={(event) =>
          onStatusFilterChange(event.target.value as CourseStatus | "all")
        }
      >
        <option value="all">All status</option>
        <option value="draft">Draft</option>
        <option value="published">Published</option>
        <option value="archived">Archived</option>
      </select>

      <select
        value={sortOrder}
        onChange={(event) => onSortChange(event.target.value as SortOrder)}
        className="rounded-md border border-gray-300 px-3 py-2 outline-none"
      >
        <option value="title-asc">Title A-Z</option>
        <option value="title-desc">Title Z-A</option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  );
}
