import thumbnail from "@assets/radio-group-thumbnail.svg";
import { PropControl } from "@/types/component.types";
import { CustomRadioGroupProps } from "./CustomRadioGroup";

export const radioGroupMeta = {
  category: "ui" as const,
  name: "Radio Group",
  description: "여러 선택지 중 하나를 고르는 접근 가능한 라디오 그룹입니다.",
  tags: ["form", "input", "selection", "radio"],
  aliases: ["라디오", "단일 선택", "옵션 선택"],
  updatedAt: new Date("2026-08-20"),
  image: thumbnail,
  propControls: {
    label: { type: "string", label: "그룹 레이블" },
    value: {
      type: "select",
      label: "선택 값",
      options: ["starter", "pro", "team"],
    },
    orientation: {
      type: "select",
      label: "배치 방향",
      options: ["vertical", "horizontal"],
    },
    disabled: { type: "boolean", label: "전체 비활성화" },
  } as Partial<Record<keyof CustomRadioGroupProps, PropControl>>,
};
