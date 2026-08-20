import { Laptop, MoonStar, Smartphone, SunMedium } from "lucide-react";
import { ReactNode, useMemo, useState } from "react";

type PreviewDevice = "desktop" | "mobile";

const PreviewShell = ({ children }: { children: ReactNode }) => {
  const [device, setDevice] = useState<PreviewDevice>("desktop");
  const [isDark, setIsDark] = useState(false);

  const frameClasses = useMemo(
    () =>
      isDark
        ? "bg-slate-950 text-slate-100 shadow-2xl ring-1 ring-white/10"
        : "bg-white/90 text-slate-900 shadow-lg ring-1 ring-slate-200",
    [isDark],
  );

  const viewportClasses =
    device === "mobile" ? "w-full max-w-[390px]" : "w-full max-w-4xl";

  return (
    <div className="border-b border-gray-100 dark:border-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 bg-white px-5 py-4 dark:border-slate-800 dark:bg-slate-900">
        <div>
          <p className="text-xs font-semibold tracking-[0.22em] text-gray-400 uppercase">
            Preview Lab
          </p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            라이트/다크와 디바이스 폭을 바꿔가며 컴포넌트를 테스트해보세요.
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
              onClick={() => setDevice("desktop")}
              aria-pressed={device === "desktop"}
              className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition ${
                device === "desktop"
                  ? "bg-white text-gray-900 shadow-sm dark:bg-slate-700 dark:text-slate-100"
                  : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              <Laptop size={14} />
              Desktop
            </button>
            <button
              type="button"
              onClick={() => setDevice("mobile")}
              aria-pressed={device === "mobile"}
              className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition ${
                device === "mobile"
                  ? "bg-white text-gray-900 shadow-sm dark:bg-slate-700 dark:text-slate-100"
                  : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              <Smartphone size={14} />
              Mobile
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsDark((prev) => !prev)}
            aria-pressed={isDark}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition ${
              isDark
                ? "border-slate-800 bg-slate-900 text-slate-100"
                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {isDark ? <MoonStar size={14} /> : <SunMedium size={14} />}
            {isDark ? "Dark" : "Light"}
          </button>
        </div>
      </div>

      <div
        className={`flex min-h-[320px] items-center justify-center overflow-auto p-6 sm:p-8 ${
          isDark
            ? "bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_40%),linear-gradient(180deg,#020617_0%,#0f172a_100%)]"
            : "bg-[#fafafa] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"
        }`}
      >
        <div
          className={`${isDark ? "dark" : ""} transition-all duration-300 ease-out ${viewportClasses}`}
        >
          <div
            className={`rounded-[28px] p-6 transition-all duration-300 sm:p-8 ${frameClasses}`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewShell;
