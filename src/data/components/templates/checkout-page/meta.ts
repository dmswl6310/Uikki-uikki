import thumbnail from "@assets/checkout-page-thumbnail.svg";
import { PropControl } from "@/types/component.types";

export const checkoutPageMeta = {
  category: "templates" as const,
  name: "Checkout Page",
  description:
    "구매 입력 폼과 주문 요약 패널을 함께 담은 페이지 규모의 체크아웃 템플릿입니다.",
  tags: ["checkout", "page", "ecommerce", "template"],
  aliases: ["템플릿", "결제 페이지", "체크아웃", "쇼핑몰"],
  updatedAt: new Date("2026-08-20"),
  image: thumbnail,
  propControls: {
    heading: { type: "string" as PropControl["type"] },
    subheading: { type: "string" as PropControl["type"] },
    totalPrice: {
      type: "number" as PropControl["type"],
      min: 10000,
      max: 300000,
      step: 1000,
    },
    primaryActionLabel: { type: "string" as PropControl["type"] },
  },
};
