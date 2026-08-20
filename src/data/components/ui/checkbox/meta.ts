import thumbnail from "@assets/checkbox-thumbnail.svg";
import { PropControl } from "@/types/component.types";
import { CustomCheckboxProps } from "./CustomCheckbox";

export const checkboxMeta = {
  category: "ui" as const,
  name: "Checkbox",
  description: "단일 항목의 선택 여부를 표시하고 변경하는 체크박스입니다.",
  tags: ["form", "input", "selection", "boolean"],
  aliases: ["체크박스", "선택", "동의"],
  updatedAt: new Date("2026-08-20"),
  image: thumbnail,
  propControls: {
    label: { type: "string", label: "레이블" },
    description: { type: "textarea", label: "설명" },
    checked: { type: "boolean", label: "선택 상태" },
    indeterminate: { type: "boolean", label: "일부 선택 상태" },
    disabled: { type: "boolean", label: "비활성화" },
  } as Partial<Record<keyof CustomCheckboxProps, PropControl>>,
};
