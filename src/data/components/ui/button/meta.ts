import thumbnail from "@assets/button-thumbnail.webp";
import type { PropControl, PropControlsOf } from "@/types/component.types";
import type { CustomButtonProps } from "./CustomButton";

export const buttonMeta = {
  category: "ui" as const,
  name: "Button",
  description: "클릭 가능한 요소입니다.",
  tags: ["form", "basic"],
  aliases: ["버튼", "클릭"],
  updatedAt: new Date("2025-07-07"),
  image: thumbnail,
  propControls: {
    label: { type: "string" as PropControl["type"] },
  } satisfies PropControlsOf<CustomButtonProps>,
};
