import thumbnail from "@assets/card-thumbnail.webp";
import { PropControl } from "@/types/component.types";

export const cardMeta = {
  category: "ui" as const,
  name: "Card",
  description:
    "연관된 정보들을 모아서 보여주는 고급스러운 박스 형태의 레이아웃입니다.",
  tags: ["layout", "container", "surface"],
  aliases: ["카드", "박스", "컨테이너"],
  updatedAt: new Date("2026-08-20"),
  image: thumbnail,
  propControls: {
    title: { type: "string" as PropControl["type"] },
    description: { type: "string" as PropControl["type"] },
    footerText: { type: "string" as PropControl["type"] },
  },
};
