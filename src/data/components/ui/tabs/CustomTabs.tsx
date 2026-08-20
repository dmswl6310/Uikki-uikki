import React, { useId, useState } from "react";

export type TabItem = {
  id: string;
  label: string;
  content: React.ReactNode;
};

export type CustomTabsProps = {
  tabs: TabItem[];
  defaultActiveId?: string;
  variant?: "line" | "pill";
};

export const CustomTabs = ({
  tabs = [],
  defaultActiveId,
  variant = "line",
}: CustomTabsProps) => {
  const [activeId, setActiveId] = useState<string>(
    defaultActiveId || (tabs.length > 0 ? tabs[0].id : ""),
  );
  const tabsId = useId();

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (currentIndex + direction + tabs.length) % tabs.length;
    setActiveId(tabs[nextIndex].id);
  };

  if (!tabs || tabs.length === 0) return null;

  return (
    <div className="w-full max-w-2xl">
      <div
        role="tablist"
        aria-label="콘텐츠 탭"
        className={`flex space-x-1 overflow-x-auto ${
          variant === "line"
            ? "border-b border-gray-200 dark:border-slate-800"
            : "rounded-xl bg-gray-100 p-1 dark:bg-slate-800"
        }`}
      >
        {tabs.map((tab, index) => {
          const isActive = activeId === tab.id;

          if (variant === "line") {
            return (
              <button
                type="button"
                key={tab.id}
                onClick={() => setActiveId(tab.id)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                role="tab"
                id={`${tabsId}-tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`${tabsId}-panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                className={`border-b-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
              >
                {tab.label}
              </button>
            );
          }

          // pill variant
          return (
            <button
              type="button"
              key={tab.id}
              onClick={() => setActiveId(tab.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              role="tab"
              id={`${tabsId}-tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`${tabsId}-panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-all ${
                isActive
                  ? "bg-white text-gray-900 shadow-sm dark:bg-slate-900 dark:text-white"
                  : "text-gray-500 hover:bg-white/50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-slate-700/50 dark:hover:text-gray-200"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`${tabsId}-panel-${activeId}`}
        aria-labelledby={`${tabsId}-tab-${activeId}`}
        className="mt-4 rounded-xl border border-gray-100 bg-white p-4 text-sm text-gray-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-gray-400"
      >
        {tabs.find((t) => t.id === activeId)?.content}
      </div>
    </div>
  );
};
