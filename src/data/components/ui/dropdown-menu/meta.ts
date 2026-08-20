import thumbnail from "@assets/dropdown-menu-thumbnail.svg";
import { PropControl } from "@/types/component.types";
import { CustomDropdownMenuProps } from "./CustomDropdownMenu";

export const dropdownMenuMeta = {
  category: "ui" as const,
  name: "Dropdown Menu",
  description:
    "버튼에서 열리며 키보드 탐색과 포커스 복원을 지원하는 작업 메뉴입니다.",
  tags: ["overlay", "menu", "navigation", "actions"],
  aliases: ["드롭다운 메뉴", "작업 메뉴", "컨텍스트 메뉴"],
  updatedAt: new Date("2026-08-20"),
  image: thumbnail,
  propControls: {
    label: { type: "string", label: "트리거 레이블" },
    align: {
      type: "select",
      label: "메뉴 정렬",
      options: ["left", "right"],
    },
  } as Partial<Record<keyof CustomDropdownMenuProps, PropControl>>,
};
