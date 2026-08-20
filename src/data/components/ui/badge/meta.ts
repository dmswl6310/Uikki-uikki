import thumbnail from "@assets/badge-thumbnail.webp";
import { PropControl } from "@/types/component.types";

export const badgeMeta = {
  category: "ui" as const,
  name: "Badge",
  description: "짧고 간결한 정보나 상태를 표시하는 작은 디자인 요소입니다.",
  tags: ["status", "indicator", "tag"],
  aliases: ["배지", "뱃지", "라벨", "태그"],
  updatedAt: new Date("2026-08-20"),
  image: thumbnail,
  propControls: {
    text: { type: "string" as PropControl["type"] },
    color: {
      type: "select" as PropControl["type"],
      options: ["blue", "red", "green", "gray"],
    },
    variant: {
      type: "select" as PropControl["type"],
      options: ["solid", "outline"],
    },
  },
};
