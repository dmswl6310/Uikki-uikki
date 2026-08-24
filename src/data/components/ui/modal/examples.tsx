import { CustomModalProps } from "./CustomModal";

export const modalExamples: CustomModalProps[] = [
  {
    title: "삭제 확인",
    description: "이 작업은 되돌릴 수 없습니다. 정말 삭제하시겠습니까?",
    confirmText: "삭제하기",
    modal: false,
  },
  {
    title: "변경 사항 저장",
    description: "작업 중인 내용을 저장하고 계속하시겠습니까?",
    confirmText: "저장하기",
    modal: false,
  },
];
