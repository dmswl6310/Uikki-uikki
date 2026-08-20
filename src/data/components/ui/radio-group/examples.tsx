import { CustomRadioGroupProps } from "./CustomRadioGroup";

const planOptions = [
  {
    value: "starter",
    label: "Starter",
    description: "개인 프로젝트를 시작하는 데 필요한 기본 기능",
  },
  {
    value: "pro",
    label: "Pro",
    description: "팀 협업과 고급 분석 기능을 포함한 요금제",
  },
  {
    value: "team",
    label: "Team",
    description: "조직 단위 권한과 우선 지원을 제공하는 요금제",
  },
];

export const radioGroupExamples: CustomRadioGroupProps[] = [
  {
    label: "요금제를 선택하세요",
    options: planOptions,
    value: "pro",
    orientation: "vertical",
    disabled: false,
  },
  {
    label: "결제 주기",
    options: [
      { value: "starter", label: "월간" },
      { value: "pro", label: "연간 · 20% 할인" },
      { value: "team", label: "기업 문의", disabled: true },
    ],
    value: "starter",
    orientation: "horizontal",
    disabled: false,
  },
];
