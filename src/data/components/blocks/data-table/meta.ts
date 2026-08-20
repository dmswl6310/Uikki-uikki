import thumbnail from "@assets/data-table-thumbnail.svg";
import { PropControl } from "@/types/component.types";
import { CustomDataTableProps } from "./CustomDataTable";

export const dataTableMeta = {
  category: "blocks" as const,
  name: "Data Table",
  description:
    "검색, 정렬, 행 선택, 페이지네이션과 작업 메뉴를 제공하는 Generic 데이터 테이블입니다.",
  tags: ["data", "table", "sorting", "filter", "pagination"],
  aliases: ["데이터 테이블", "목록", "관리 테이블"],
  updatedAt: new Date("2026-08-20"),
  image: thumbnail,
  propControls: {
    title: { type: "string", label: "제목" },
    description: { type: "textarea", label: "설명" },
    searchable: { type: "boolean", label: "검색 사용" },
    searchPlaceholder: { type: "string", label: "검색 안내문" },
    selectable: { type: "boolean", label: "행 선택 사용" },
    pageSize: { type: "number", label: "페이지 크기", min: 2, max: 8, step: 1 },
  } as Partial<Record<keyof CustomDataTableProps, PropControl>>,
};
