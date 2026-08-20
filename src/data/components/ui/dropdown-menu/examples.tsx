import { CustomDropdownMenuProps } from "./CustomDropdownMenu";

const projectMenuItems = [
  {
    id: "open",
    label: "프로젝트 열기",
    description: "새 탭에서 상세 화면을 엽니다.",
  },
  { id: "duplicate", label: "복제하기" },
  { id: "archive", label: "보관하기", separatorBefore: true },
  { id: "delete", label: "삭제하기", danger: true },
];

export const dropdownMenuExamples: CustomDropdownMenuProps[] = [
  {
    label: "프로젝트 작업",
    items: projectMenuItems,
    align: "left",
  },
  {
    label: "계정 메뉴",
    items: [
      { id: "profile", label: "프로필" },
      { id: "settings", label: "설정" },
      { id: "billing", label: "결제 관리", disabled: true },
      { id: "logout", label: "로그아웃", separatorBefore: true, danger: true },
    ],
    align: "right",
  },
];
