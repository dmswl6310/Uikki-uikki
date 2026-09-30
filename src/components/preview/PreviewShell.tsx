import { ReactNode, useMemo } from "react";

export type PreviewDevice = "wide" | "mobile";

type PreviewShellProps = {
  children: ReactNode;
  device?: PreviewDevice;
  isDark?: boolean;
};

const PreviewShell = ({
  children,
  device = "wide",
  isDark = false,
}: PreviewShellProps) => {

  const frameClasses = useMemo(
    () =>
      isDark
        ? "bg-slate-950 text-slate-100 shadow-2xl ring-1 ring-white/10"
        : "bg-white/90 text-slate-900 shadow-lg ring-1 ring-slate-200",
    [isDark],
  );

  const viewportClasses =
    device === "mobile" ? "w-[390px] max-w-full" : "w-full";

  return (
    <div
      className="border-b border-gray-100 dark:border-slate-800"
      role="region"
      aria-label={`컴포넌트 미리보기 · ${device === "mobile" ? "모바일 390px" : "가용 너비"}`}
    >
      <div
        className={`flex min-h-[320px] items-center justify-center overflow-auto p-2 sm:p-4 ${
          isDark
            ? "bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_40%),linear-gradient(180deg,#020617_0%,#0f172a_100%)]"
            : "bg-[#fafafa] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"
        }`}
      >
        <div
          className={`${isDark ? "dark" : ""} ${viewportClasses} min-w-0 transition-all duration-300 ease-out motion-reduce:transition-none`}
        >
          <div
            className={`min-w-0 rounded-[28px] p-2 transition-all duration-300 sm:p-4 ${frameClasses}`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewShell;
