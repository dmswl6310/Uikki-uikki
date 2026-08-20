export type CustomBadgeProps = {
  text: string;
  color: "blue" | "red" | "green" | "gray";
  variant: "solid" | "outline";
};

export const CustomBadge = ({
  text,
  color = "blue",
  variant = "solid",
}: CustomBadgeProps) => {
  const baseStyles =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors";

  const solidColors = {
    blue: "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-200",
    red: "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-200",
    green:
      "bg-green-100 text-green-800 dark:bg-green-950/60 dark:text-green-200",
    gray: "bg-gray-100 text-gray-800 dark:bg-slate-800 dark:text-gray-200",
  };

  const outlineColors = {
    blue: "text-blue-600 ring-1 ring-inset ring-blue-500/30 dark:text-blue-300 dark:ring-blue-400/40",
    red: "text-red-600 ring-1 ring-inset ring-red-500/30 dark:text-red-300 dark:ring-red-400/40",
    green:
      "text-green-600 ring-1 ring-inset ring-green-500/30 dark:text-green-300 dark:ring-green-400/40",
    gray: "text-gray-600 ring-1 ring-inset ring-gray-500/30 dark:text-gray-300 dark:ring-gray-400/40",
  };

  const styleClass =
    variant === "solid" ? solidColors[color] : outlineColors[color];

  return <span className={`${baseStyles} ${styleClass}`}>{text}</span>;
};
