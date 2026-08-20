import thumbnail from "@assets/toast-thumbnail.webp";
import { PropControl } from "@/types/component.types";

export const toastMeta = {
  category: "ui" as const,
  name: "Toast",
  description:
    "사용자에게 간결한 피드백 메시지를 보여주는 알림 컴포넌트입니다.",
  tags: ["feedback", "notification", "indicator"],
  aliases: ["토스트", "알림", "스낵바", "메시지"],
  updatedAt: new Date("2026-08-20"),
  image: thumbnail,
  propControls: {
    message: { type: "string" as PropControl["type"] },
    variant: {
      type: "select" as PropControl["type"],
      options: ["success", "error", "info", "warning"],
    },
  },
};
