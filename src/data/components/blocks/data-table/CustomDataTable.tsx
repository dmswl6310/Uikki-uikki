import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  CustomDropdownMenu,
  type DropdownMenuItem,
} from "@/data/components/ui/dropdown-menu/CustomDropdownMenu";

export type DataTableColumn<T extends object> = {
  key: keyof T & string;
  header: string;
  sortable?: boolean;
  align?: "left" | "center" | "right";
  render?: (value: T[keyof T], row: T) => ReactNode;
};

export type CustomDataTableProps<T extends object = Record<string, unknown>> = {
  title?: string;
  description?: string;
  columns: DataTableColumn<T>[];
  data: T[];
  searchable?: boolean;
  searchPlaceholder?: string;
  selectable?: boolean;
  pageSize?: number;
  emptyMessage?: string;
  rowActions?: DropdownMenuItem[];
  getRowId?: (row: T, index: number) => string;
  onRowAction?: (actionId: string, row: T) => void;
};

const SelectionCheckbox = ({
  label,
  checked,
  indeterminate = false,
  onChange,
}: {
  label: string;
  checked: boolean;
  indeterminate?: boolean;
  onChange: (checked: boolean) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <input
      ref={inputRef}
      type="checkbox"
      aria-label={label}
      checked={checked}
      onChange={(event) => onChange(event.target.checked)}
      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-900"
    />
  );
};

export const CustomDataTable = <T extends object>({
  title,
  description,
  columns,
  data,
  searchable = true,
  searchPlaceholder = "검색어를 입력하세요",
  selectable = true,
  pageSize = 5,
  emptyMessage = "표시할 데이터가 없습니다.",
  rowActions,
  getRowId,
  onRowAction,
}: CustomDataTableProps<T>) => {
  const safePageSize = Math.max(1, Math.round(Number(pageSize) || 5));
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState<{
    key: keyof T & string;
    direction: "asc" | "desc";
  } | null>(null);

  const resolveRowId = (row: T, index: number) => {
    if (getRowId) return getRowId(row, index);
    const record = row as Record<string, unknown>;
    const candidateId = record.id;
    return typeof candidateId === "string" || typeof candidateId === "number"
      ? String(candidateId)
      : String(index);
  };

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    const matchingRows = normalizedQuery
      ? data.filter((row) =>
          Object.values(row as Record<string, unknown>).some((value) =>
            String(value).toLocaleLowerCase().includes(normalizedQuery),
          ),
        )
      : [...data];

    if (!sort) return matchingRows;

    return matchingRows.sort((left, right) => {
      const leftValue = left[sort.key];
      const rightValue = right[sort.key];
      const comparison =
        typeof leftValue === "number" && typeof rightValue === "number"
          ? leftValue - rightValue
          : String(leftValue ?? "").localeCompare(
              String(rightValue ?? ""),
              "ko",
              {
                numeric: true,
              },
            );
      return sort.direction === "asc" ? comparison : -comparison;
    });
  }, [data, query, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / safePageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleRows = filteredRows.slice(
    (currentPage - 1) * safePageSize,
    currentPage * safePageSize,
  );
  const visibleRowIds = visibleRows.map((row) =>
    resolveRowId(row, data.indexOf(row)),
  );
  const selectedVisibleCount = visibleRowIds.filter((id) =>
    selectedRows.has(id),
  ).length;
  const allVisibleSelected =
    visibleRowIds.length > 0 && selectedVisibleCount === visibleRowIds.length;

  useEffect(() => {
    setPage((current) => Math.min(current, totalPages));
  }, [totalPages]);

  const toggleSort = (key: keyof T & string) => {
    setSort((current) =>
      current?.key === key
        ? { key, direction: current.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" },
    );
  };

  const toggleVisibleRows = (checked: boolean) => {
    setSelectedRows((current) => {
      const next = new Set(current);
      visibleRowIds.forEach((id) => (checked ? next.add(id) : next.delete(id)));
      return next;
    });
  };

  return (
    <section className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
      {(title || description || searchable) && (
        <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-end sm:justify-between dark:border-slate-800">
          <div>
            {title && (
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {description}
              </p>
            )}
          </div>
          {searchable && (
            <label className="relative block w-full sm:max-w-xs">
              <span className="sr-only">테이블 검색</span>
              <svg
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
                className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400"
              >
                <circle
                  cx="9"
                  cy="9"
                  r="5.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="m13 13 4 4"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.8"
                />
              </svg>
              <input
                type="search"
                value={query}
                placeholder={searchPlaceholder}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(1);
                }}
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pr-3 pl-9 text-sm text-slate-900 transition outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </label>
          )}
        </div>
      )}

      <div
        className="overflow-x-auto focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
        role="region"
        aria-label="데이터 표"
        tabIndex={0}
      >
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <caption className="sr-only">
            {title || "데이터 목록"}. 총 {filteredRows.length}개 항목
          </caption>
          <thead className="bg-slate-50 text-xs tracking-wide text-slate-500 uppercase dark:bg-slate-950/60 dark:text-slate-400">
            <tr>
              {selectable && (
                <th scope="col" className="w-12 px-4 py-3 text-center">
                  <SelectionCheckbox
                    label="현재 페이지의 모든 행 선택"
                    checked={allVisibleSelected}
                    indeterminate={
                      selectedVisibleCount > 0 && !allVisibleSelected
                    }
                    onChange={toggleVisibleRows}
                  />
                </th>
              )}
              {columns.map((column) => {
                const ariaSort =
                  sort?.key === column.key
                    ? sort.direction === "asc"
                      ? "ascending"
                      : "descending"
                    : "none";

                return (
                  <th
                    key={column.key}
                    scope="col"
                    aria-sort={column.sortable ? ariaSort : undefined}
                    className={`px-4 py-3 font-semibold ${
                      column.align === "right"
                        ? "text-right"
                        : column.align === "center"
                          ? "text-center"
                          : "text-left"
                    }`}
                  >
                    {column.sortable ? (
                      <button
                        type="button"
                        onClick={() => toggleSort(column.key)}
                        className="inline-flex items-center gap-1 rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
                      >
                        {column.header}
                        <span aria-hidden="true" className="text-sm">
                          {sort?.key === column.key
                            ? sort.direction === "asc"
                              ? "↑"
                              : "↓"
                            : "↕"}
                        </span>
                      </button>
                    ) : (
                      column.header
                    )}
                  </th>
                );
              })}
              {rowActions?.length ? (
                <th scope="col" className="w-20 px-4 py-3 text-right">
                  작업
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {visibleRows.length ? (
              visibleRows.map((row) => {
                const originalIndex = data.indexOf(row);
                const rowId = resolveRowId(row, originalIndex);
                const isSelected = selectedRows.has(rowId);

                return (
                  <tr
                    key={rowId}
                    className={`transition-colors ${
                      isSelected
                        ? "bg-blue-50/70 dark:bg-blue-950/20"
                        : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    }`}
                  >
                    {selectable && (
                      <td className="px-4 py-4 text-center">
                        <SelectionCheckbox
                          label={`${rowId} 행 선택`}
                          checked={isSelected}
                          onChange={(checked) =>
                            setSelectedRows((current) => {
                              const next = new Set(current);
                              if (checked) next.add(rowId);
                              else next.delete(rowId);
                              return next;
                            })
                          }
                        />
                      </td>
                    )}
                    {columns.map((column) => {
                      const value = row[column.key];
                      return (
                        <td
                          key={column.key}
                          className={`px-4 py-4 text-slate-700 dark:text-slate-300 ${
                            column.align === "right"
                              ? "text-right"
                              : column.align === "center"
                                ? "text-center"
                                : "text-left"
                          }`}
                        >
                          {column.render
                            ? column.render(value, row)
                            : String(value ?? "—")}
                        </td>
                      );
                    })}
                    {rowActions?.length ? (
                      <td className="px-4 py-3 text-right">
                        <CustomDropdownMenu
                          label="행 작업"
                          items={rowActions}
                          align="right"
                          onSelect={(actionId) => onRowAction?.(actionId, row)}
                        />
                      </td>
                    ) : null}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={
                    columns.length +
                    (selectable ? 1 : 0) +
                    (rowActions?.length ? 1 : 0)
                  }
                  className="px-6 py-16 text-center text-sm text-slate-500 dark:text-slate-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <footer className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 text-sm sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
        <p className="text-slate-500 dark:text-slate-400">
          {selectable && selectedRows.size > 0
            ? `${selectedRows.size}개 선택 · `
            : ""}
          총 {filteredRows.length}개
        </p>
        <div className="flex items-center gap-3">
          <span className="text-slate-500 dark:text-slate-400">
            {currentPage} / {totalPages} 페이지
          </span>
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            className="rounded-lg border border-slate-300 px-3 py-1.5 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            이전
          </button>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() =>
              setPage((current) => Math.min(totalPages, current + 1))
            }
            className="rounded-lg border border-slate-300 px-3 py-1.5 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            다음
          </button>
        </div>
      </footer>
    </section>
  );
};
