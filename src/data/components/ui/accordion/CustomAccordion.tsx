import { useId, useState } from "react";

export type AccordionItem = {
  id: string;
  title: string;
  content: React.ReactNode;
};

export type CustomAccordionProps = {
  items: AccordionItem[];
  allowMultiple?: boolean;
};

export const CustomAccordion = ({
  items = [],
  allowMultiple = false,
}: CustomAccordionProps) => {
  const [openIds, setOpenIds] = useState<string[]>([]);
  const accordionId = useId();

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  if (!items || items.length === 0) {
    return <div className="text-sm text-gray-400">항목이 없습니다.</div>;
  }

  return (
    <div className="w-full max-w-md divide-y divide-gray-200 overflow-hidden rounded-xl border border-gray-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className="group">
            <button
              type="button"
              onClick={() => toggle(item.id)}
              id={`${accordionId}-trigger-${item.id}`}
              aria-expanded={isOpen}
              aria-controls={`${accordionId}-panel-${item.id}`}
              className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-gray-50 focus:outline-none focus-visible:bg-gray-50 dark:hover:bg-slate-800/50 dark:focus-visible:bg-slate-800"
            >
              <span className="text-sm font-medium text-gray-900 dark:text-slate-100">
                {item.title}
              </span>
              <svg
                className={`h-5 w-5 text-gray-500 transition-transform duration-200 dark:text-gray-400 ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              id={`${accordionId}-panel-${item.id}`}
              role="region"
              aria-labelledby={`${accordionId}-trigger-${item.id}`}
              aria-hidden={!isOpen}
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-5 pt-1 pb-4 text-sm text-gray-600 dark:text-gray-400">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
