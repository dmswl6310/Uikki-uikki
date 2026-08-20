import thumbnail from "@assets/drawer-thumbnail.svg";
import { PropControl } from "@/types/component.types";

export const drawerMeta = {
  name: "Drawer",
  description: "화면 가장자리에서 미끄러져 들어오는 패널(Sheet)입니다.",
  tags: ["UI", "Overlay", "Modal", "Sheet"],
  aliases: ["드로워", "사이드바", "시트", "오프캔버스"],
  image: thumbnail,
  propControls: {
    position: {
      type: "select",
      options: ["left", "right", "top", "bottom"],
      label: "열리는 방향",
    },
    title: {
      type: "string",
      label: "패널 제목",
    },
  } as Record<string, PropControl>,
};
