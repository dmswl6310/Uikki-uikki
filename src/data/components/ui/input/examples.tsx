import { CustomInputProps } from "./CustomInput";

export const inputExamples: CustomInputProps[] = [
  { label: "이메일", placeholder: "이메일을 입력하세요", type: "email", disabled: false },
  { label: "비밀번호", placeholder: "비밀번호 (가려짐)", type: "password", disabled: false },
  { label: "비활성 입력", placeholder: "비활성화된 입력창", type: "text", disabled: true },
];
