import { useState } from "react";
import { Laptop, MoonStar, Smartphone, SunMedium } from "lucide-react";
import Example from "./Example";
import type { RegisteredComponentInfo } from "@/types/component.types";
import type { PreviewDevice } from "./preview/PreviewShell";

type ExamplesProps = {
  componentInfo: RegisteredComponentInfo;
  examples: Array<Record<string, unknown>>;
};

const Examples = ({ componentInfo, examples }: ExamplesProps) => {
  const [device, setDevice] = useState<PreviewDevice>("wide");
  const [isDark, setIsDark] = useState(false);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div>
          <p className="text-xs font-semibold tracking-[0.22em] text-gray-400 uppercase">
            Preview Lab
          </p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            테마와 미리보기 폭을 바꿔 모든 예제를 한 번에 확인해보세요.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div
            className="flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 p-1 dark:border-slate-700 dark:bg-slate-800"
            role="group"
            aria-label="미리보기 화면 폭"
          >
            <button
              type="button"
              onClick={() => setDevice("wide")}
              aria-pressed={device === "wide"}
              className={`inline-flex min-h-10 items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition-colors ${
                device === "wide"
                  ? "bg-white text-gray-900 shadow-sm dark:bg-slate-700 dark:text-slate-100"
                  : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              <Laptop size={14} />
              넓게
            </button>
            <button
              type="button"
              onClick={() => setDevice("mobile")}
              aria-pressed={device === "mobile"}
              className={`inline-flex min-h-10 items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition-colors ${
                device === "mobile"
                  ? "bg-white text-gray-900 shadow-sm dark:bg-slate-700 dark:text-slate-100"
                  : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              <Smartphone size={14} />
              모바일 390px
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsDark((previous) => !previous)}
            aria-pressed={isDark}
            className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition-colors ${
              isDark
                ? "border-slate-800 bg-slate-900 text-slate-100"
                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {isDark ? <MoonStar size={14} /> : <SunMedium size={14} />}
            {isDark ? "다크" : "라이트"}
          </button>
        </div>
      </div>

      {examples.map((exampleData, index) => (
        <Example
          key={index}
          componentInfo={componentInfo}
          exampleData={exampleData}
          previewDevice={device}
          previewIsDark={isDark}
        />
      ))}
    </div>
  );
};

export default Examples;
