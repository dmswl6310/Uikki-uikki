import thumbnail from "@assets/tabs-thumbnail.svg";
import { PropControl } from "@/types/component.types";

export const tabsMeta = {
  category: "ui" as const,
  name: "Tabs",
  description: "여러 콘텐츠를 탭 형태로 분류하여 보여줍니다.",
  tags: ["UI", "Navigation", "Layout"],
  aliases: ["탭 메뉴", "내비게이션"],
  updatedAt: new Date("2026-05-14"),
  image: thumbnail,
  propControls: {
    variant: {
      type: "select",
      options: ["line", "pill"],
      label: "디자인 스타일",
    },
  } as Record<string, PropControl>,
};
