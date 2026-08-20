import thumbnail from "@assets/progress-thumbnail.webp";
import { PropControl } from "@/types/component.types";

export const progressMeta = {
  category: "ui" as const,
  name: "Progress",
  description:
    "작업 진행률이나 완료 상태를 시각적으로 보여주는 바 컴포넌트입니다.",
  tags: ["feedback", "display", "indicator"],
  aliases: ["프로그레스", "진행률", "로딩바", "상태바"],
  updatedAt: new Date("2026-08-20"),
  image: thumbnail,
  propControls: {
    label: { type: "string" as PropControl["type"] },
    value: { type: "number" as PropControl["type"], min: 0, max: 100, step: 1 },
    color: {
      type: "select" as PropControl["type"],
      options: ["blue", "green", "indigo", "amber"],
    },
  },
};
