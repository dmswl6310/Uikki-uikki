// 타입 검사 전용 파일입니다. `npm run typecheck`(tsc)에서만 확인되고 번들에는 들어가지 않습니다.
import type { PropControlsOf } from "./component.types";

type SampleProps = { label: string; size: "sm" | "md" };

export const validControls = {
  label: { type: "string" },
  size: { type: "select", options: ["sm", "md"] },
} satisfies PropControlsOf<SampleProps>;

export const invalidControls = {
  label: { type: "string" },
  // @ts-expect-error 컴포넌트에 없는 props 이름은 타입 오류가 나야 합니다.
  wrongName: { type: "string" },
} satisfies PropControlsOf<SampleProps>;
