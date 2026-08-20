import thumbnail from "@assets/modal-thumbnail.webp";
import { PropControl } from "@/types/component.types";

export const modalMeta = {
  category: "ui" as const,
  name: "Modal",
  description:
    "사용자에게 확인이나 추가 정보를 요청하는 대화상자 컴포넌트입니다.",
  tags: ["overlay", "dialog", "interaction"],
  aliases: ["모달", "팝업", "다이얼로그", "창"],
  updatedAt: new Date("2026-08-20"),
  image: thumbnail,
  propControls: {
    title: { type: "string" as PropControl["type"] },
    description: { type: "string" as PropControl["type"] },
    confirmText: { type: "string" as PropControl["type"] },
  },
};
