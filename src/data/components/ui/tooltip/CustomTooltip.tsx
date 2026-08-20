import { useId, type ReactNode } from "react";

export type CustomTooltipProps = {
  content: string;
  position?: "top" | "bottom" | "left" | "right";
  children: ReactNode;
};

export const CustomTooltip = ({
  content,
  position = "top",
  children,
}: CustomTooltipProps) => {
  const tooltipId = useId();
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowClasses = {
    top: "bottom-[-4px] left-1/2 -translate-x-1/2 border-t-gray-900 border-l-transparent border-r-transparent border-b-transparent",
    bottom:
      "top-[-4px] left-1/2 -translate-x-1/2 border-b-gray-900 border-l-transparent border-r-transparent border-t-transparent",
    left: "right-[-4px] top-1/2 -translate-y-1/2 border-l-gray-900 border-t-transparent border-b-transparent border-r-transparent",
    right:
      "left-[-4px] top-1/2 -translate-y-1/2 border-r-gray-900 border-t-transparent border-b-transparent border-l-transparent",
  };

  return (
    <span
      className="group relative inline-flex"
      tabIndex={0}
      aria-describedby={tooltipId}
    >
      {children}
      <div
        id={tooltipId}
        role="tooltip"
        className={`pointer-events-none absolute z-50 rounded bg-gray-900 px-2 py-1 text-xs font-medium whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-focus-within:opacity-100 group-hover:opacity-100 dark:bg-slate-100 dark:text-slate-900 ${positionClasses[position]}`}
      >
        {content}
        <span
          className={`absolute border-[5px] ${arrowClasses[position]}`}
        ></span>
      </div>
    </span>
  );
};
