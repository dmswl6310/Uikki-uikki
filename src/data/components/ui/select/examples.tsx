import { CustomSelectProps } from "./CustomSelect";

const regionOptions = [
  { value: "seoul", label: "서울" },
  { value: "busan", label: "부산" },
  { value: "jeju", label: "제주" },
];

export const selectExamples: CustomSelectProps[] = [
  {
    label: "근무 지역",
    options: regionOptions,
    value: "seoul",
    placeholder: "지역을 선택하세요",
    helperText: "주로 근무할 지역을 선택해 주세요.",
    error: "",
    disabled: false,
  },
  {
    label: "배송 지역",
    options: regionOptions,
    value: "",
    placeholder: "배송 지역을 선택하세요",
    helperText: "",
    error: "배송 지역을 선택해야 합니다.",
    disabled: false,
  },
];
