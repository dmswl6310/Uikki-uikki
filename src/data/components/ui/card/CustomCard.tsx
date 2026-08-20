export type CustomCardProps = {
  title: string;
  description: string;
  footerText: string;
};

export const CustomCard = ({
  title,
  description,
  footerText,
}: CustomCardProps) => {
  return (
    <article className="w-full max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:border-gray-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600">
      <div className="p-6">
        <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-slate-100">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
      <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/80 px-6 py-4 dark:border-slate-800 dark:bg-slate-800/60">
        <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
          {footerText}
        </p>
        <div
          className="h-2 w-2 rounded-full bg-green-500"
          aria-hidden="true"
        ></div>
      </div>
    </article>
  );
};
