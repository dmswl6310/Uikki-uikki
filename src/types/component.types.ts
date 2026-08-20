import type { ComponentType, ElementType } from "react";

export type ComponentCategory = "ui" | "blocks" | "templates";

type ControlBase = { label?: string };

export type ControlType =
  | "string"
  | "boolean"
  | "select"
  | "number"
  | "color"
  | "radio"
  | "textarea";

export interface PropControl extends ControlBase {
  type: ControlType;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
}

export interface ComponentInfo<T extends object = Record<string, unknown>> {
  id: string; // 라우팅이나 key로 쓸 고유id
  name: string; // UI에 보여질 실제 컴포넌트 이름
  category?: ComponentCategory; // ui | blocks | templates
  tags?: string[]; // 검색/필터용 태그
  aliases?: string[]; // 검색 보조 키워드
  image?: string; // 썸네일 이미지

  updatedAt: Date; // 마지막 수정날짜
  description: string; // 컴포넌트 설명
  usage?: string; // 상세 페이지에 보여줄 사용 가이드 (Markdown 형식)

  code: string; // 사용 예시 코드 (TypeScript)
  codeJs: string; // 사용 예시 코드 (JavaScript)

  examples: T[];
  propControls?: Partial<Record<keyof T & string, PropControl>>; // 동적 Playground 컨트롤 속성
  Component?: ComponentType<T>; // 동적 로딩된 실제 컴포넌트
}

export type RegisteredComponentInfo = Omit<
  ComponentInfo<Record<string, unknown>>,
  "examples" | "propControls" | "Component"
> & {
  examples: Array<Record<string, unknown>>;
  propControls?: Partial<Record<string, PropControl>>;
  Component?: ElementType;
};

export type ComponentCatalogItem = Pick<
  RegisteredComponentInfo,
  | "id"
  | "name"
  | "category"
  | "tags"
  | "aliases"
  | "image"
  | "updatedAt"
  | "description"
  | "usage"
>;
