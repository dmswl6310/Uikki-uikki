import type { RegisteredComponentInfo } from "@/types/component.types";

// Vite의 정적 분석 가능 import.meta.glob 패턴
// src/data/components/[category]/[name]/index.ts 에서 default export 된 객체들을 가져옵니다.
const modules = import.meta.glob<{ default: RegisteredComponentInfo }>(
  "./components/*/*/index.ts",
  { eager: true },
);

export const componentsData = Object.values(modules).map(
  (module) => module.default,
);
