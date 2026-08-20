import thumbnail from "@assets/tooltip-thumbnail.svg";
import { PropControl } from "@/types/component.types";

export const tooltipMeta = {
  name: "Tooltip",
  description:
    "마우스를 올렸을 때 추가적인 정보를 제공하는 말풍선 컴포넌트입니다.",
  tags: ["UI", "Overlay", "Information"],
  aliases: ["툴팁", "말풍선", "힌트"],
  image: thumbnail,
  propControls: {
    content: {
      type: "string",
      label: "툴팁 내용",
    },
    position: {
      type: "select",
      options: ["top", "bottom", "left", "right"],
      label: "표시 위치",
    },
  } as Record<string, PropControl>,
};
