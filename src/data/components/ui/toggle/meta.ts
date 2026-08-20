import thumbnail from "@assets/toggle-thumbnail.webp";
import { PropControl } from "@/types/component.types";

export const toggleMeta = {
  category: "ui" as const,
  name: "Toggle",
  description: "켜짐/꺼짐 상태를 전환하는 스위치 컴포넌트입니다.",
  tags: ["form", "input", "interaction"],
  aliases: ["토글", "스위치", "체크박스"],
  updatedAt: new Date("2026-08-20"),
  image: thumbnail,
  propControls: {
    label: { type: "string" as PropControl["type"] },
    checked: { type: "boolean" as PropControl["type"] },
  },
};
