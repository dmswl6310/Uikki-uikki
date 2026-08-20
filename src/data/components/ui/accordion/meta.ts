import thumbnail from "@assets/accordion-thumbnail.svg";
import { PropControl } from "@/types/component.types";

export const accordionMeta = {
  category: "ui" as const,
  name: "Accordion",
  description:
    "클릭하면 부드럽게 펼쳐지며 세부 내용을 보여주는 아코디언 메뉴입니다.",
  tags: ["UI", "List", "Toggle", "Collapse"],
  aliases: ["아코디언", "펼침 메뉴", "토글 리스트"],
  updatedAt: new Date("2026-05-14"),
  image: thumbnail,
  propControls: {
    allowMultiple: {
      type: "boolean",
      label: "여러 항목 동시 펼침 허용",
    },
  } as Record<string, PropControl>,
};
