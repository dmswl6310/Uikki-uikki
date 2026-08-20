export type CustomListProps = {
  first: string;
  second: string;
  third: string;
  fourth: string;
};

export const CustomList = ({
  first,
  second,
  third,
  fourth,
}: CustomListProps) => {
  return (
    <ul className="w-full max-w-md divide-y divide-gray-50 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
      {[first, second, third, fourth].map((item, index) => (
        <li
          key={index}
          className="group flex items-center justify-between px-5 py-4 transition-colors hover:bg-blue-50/50 dark:hover:bg-blue-950/20"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-950/60 dark:text-blue-300">
              {index + 1}
            </span>
            <span className="font-medium text-gray-700 transition-colors group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-slate-100">
              {item}
            </span>
          </div>
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-300 transition-colors group-hover:text-blue-500 dark:text-gray-600"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </li>
      ))}
    </ul>
  );
};
