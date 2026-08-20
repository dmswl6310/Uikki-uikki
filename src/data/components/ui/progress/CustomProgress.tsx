export type CustomProgressProps = {
  label: string;
  value: number;
  color: "blue" | "green" | "indigo" | "amber";
};

export const CustomProgress = ({
  label,
  value,
  color = "blue",
}: CustomProgressProps) => {
  const clampedValue = Math.min(100, Math.max(0, Number(value)));

  const colorMap = {
    blue: {
      track: "bg-blue-100 dark:bg-blue-950",
      fill: "bg-blue-600",
      text: "text-blue-600 dark:text-blue-300",
    },
    green: {
      track: "bg-green-100 dark:bg-green-950",
      fill: "bg-green-500",
      text: "text-green-600 dark:text-green-300",
    },
    indigo: {
      track: "bg-indigo-100 dark:bg-indigo-950",
      fill: "bg-indigo-600",
      text: "text-indigo-600 dark:text-indigo-300",
    },
    amber: {
      track: "bg-amber-100 dark:bg-amber-950",
      fill: "bg-amber-500",
      text: "text-amber-600 dark:text-amber-300",
    },
  };

  const c = colorMap[color] || colorMap.blue;

  return (
    <div className="w-full max-w-sm space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
        <span className={`text-sm font-bold tabular-nums ${c.text}`}>
          {clampedValue}%
        </span>
      </div>
      <div
        className={`h-2.5 w-full overflow-hidden rounded-full ${c.track}`}
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clampedValue}
      >
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${c.fill}`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
};
