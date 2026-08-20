import thumbnail from "@assets/skeleton-thumbnail.svg";
import { PropControl } from "@/types/component.types";
import { CustomSkeletonProps } from "./CustomSkeleton";

export const skeletonMeta = {
  category: "ui" as const,
  name: "Skeleton",
  description:
    "콘텐츠가 준비되는 동안 레이아웃 변화를 줄여주는 로딩 플레이스홀더입니다.",
  tags: ["loading", "feedback", "placeholder"],
  aliases: ["스켈레톤", "로딩", "자리 표시자"],
  updatedAt: new Date("2026-08-20"),
  image: thumbnail,
  propControls: {
    variant: {
      type: "select",
      label: "레이아웃",
      options: ["card", "list", "profile"],
    },
    count: { type: "number", label: "표시 개수", min: 1, max: 5, step: 1 },
    animated: { type: "boolean", label: "애니메이션" },
  } as Partial<Record<keyof CustomSkeletonProps, PropControl>>,
};
