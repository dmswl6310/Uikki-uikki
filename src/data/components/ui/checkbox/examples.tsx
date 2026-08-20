import { CustomCheckboxProps } from "./CustomCheckbox";

export const checkboxExamples: CustomCheckboxProps[] = [
  {
    label: "마케팅 정보 수신에 동의합니다",
    description: "제품 업데이트와 이벤트 소식을 이메일로 받아볼 수 있습니다.",
    checked: true,
    indeterminate: false,
    disabled: false,
  },
  {
    label: "모든 프로젝트 선택",
    description: "일부 프로젝트만 선택된 상태입니다.",
    checked: false,
    indeterminate: true,
    disabled: false,
  },
];
