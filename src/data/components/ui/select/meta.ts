import thumbnail from "@assets/select-thumbnail.svg";
import { PropControl } from "@/types/component.types";
import { CustomSelectProps } from "./CustomSelect";

export const selectMeta = {
  category: "ui" as const,
  name: "Select",
  description:
    "폼에서 하나의 옵션을 안전하게 선택하는 네이티브 기반 셀렉트입니다.",
  tags: ["form", "input", "selection", "native"],
  aliases: ["셀렉트", "드롭다운", "옵션 선택"],
  updatedAt: new Date("2026-08-20"),
  image: thumbnail,
  propControls: {
    label: { type: "string", label: "레이블" },
    value: {
      type: "select",
      label: "선택 값",
      options: ["seoul", "busan", "jeju"],
    },
    helperText: { type: "string", label: "도움말" },
    error: { type: "string", label: "오류 메시지" },
    disabled: { type: "boolean", label: "비활성화" },
  } as Partial<Record<keyof CustomSelectProps, PropControl>>,
};
