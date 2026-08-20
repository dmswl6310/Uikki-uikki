export type CustomSkeletonProps = {
  variant?: "card" | "list" | "profile";
  count?: number;
  animated?: boolean;
};

const Line = ({ className = "" }: { className?: string }) => (
  <div className={`rounded-full bg-slate-200 dark:bg-slate-700 ${className}`} />
);

export const CustomSkeleton = ({
  variant = "card",
  count = 1,
  animated = true,
}: CustomSkeletonProps) => {
  const safeCount = Math.min(Math.max(Math.round(Number(count) || 1), 1), 5);
  const animationClass = animated ? "animate-pulse" : "";

  return (
    <div role="status" aria-live="polite" className="w-full max-w-xl">
      <span className="sr-only">콘텐츠를 불러오는 중입니다.</span>
      <div className={`space-y-3 ${animationClass}`} aria-hidden="true">
        {Array.from({ length: safeCount }, (_, index) => {
          if (variant === "profile") {
            return (
              <div
                key={index}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="h-12 w-12 shrink-0 rounded-full bg-slate-200 dark:bg-slate-700" />
                <div className="flex-1 space-y-3">
                  <Line className="h-3 w-1/3" />
                  <Line className="h-3 w-2/3" />
                </div>
              </div>
            );
          }

          if (variant === "list") {
            return (
              <div
                key={index}
                className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="h-10 w-10 shrink-0 rounded-xl bg-slate-200 dark:bg-slate-700" />
                <div className="flex-1 space-y-2.5">
                  <Line className="h-3 w-2/5" />
                  <Line className="h-2.5 w-4/5" />
                </div>
                <Line className="h-8 w-16" />
              </div>
            );
          }

          return (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="aspect-[16/7] rounded-xl bg-slate-200 dark:bg-slate-700" />
              <div className="mt-4 space-y-3">
                <Line className="h-4 w-2/5" />
                <Line className="h-3 w-full" />
                <Line className="h-3 w-4/5" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
