import thumbnail from "@assets/newsletter-cta-thumbnail.svg";
import { PropControl } from "@/types/component.types";

export const newsletterCtaMeta = {
  category: "blocks" as const,
  name: "Newsletter CTA",
  description:
    "Badge, Input, Button을 조합해 만든 마케팅/업데이트 수신용 CTA 블록입니다.",
  tags: ["marketing", "cta", "section", "newsletter"],
  aliases: ["블록", "구독 섹션", "뉴스레터", "CTA"],
  updatedAt: new Date("2026-08-20"),
  image: thumbnail,
  propControls: {
    eyebrow: { type: "string" as PropControl["type"] },
    title: { type: "string" as PropControl["type"] },
    description: { type: "string" as PropControl["type"] },
    ctaLabel: { type: "string" as PropControl["type"] },
    placeholder: { type: "string" as PropControl["type"] },
  },
};
