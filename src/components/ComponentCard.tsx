import type { ComponentCatalogItem } from "@/types/component.types";
import { useState } from "react";
import { Link } from "react-router-dom";

const categoryLabel = {
  ui: "UI",
  blocks: "Blocks",
  templates: "Templates",
} as const;

const ComponentCard = ({
  info,
  priority = false,
}: {
  info: ComponentCatalogItem;
  priority?: boolean;
}) => {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <Link
      to={`/components/${info.id}`}
      className="block h-full rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
    >
      <article className="flex aspect-[4/5] h-full flex-col gap-4 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-md hover:ring-gray-300 dark:bg-slate-900 dark:ring-slate-800 dark:hover:ring-slate-700">
        <div className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-lg bg-gray-50 dark:bg-slate-800">
          {info.image && !imageFailed ? (
            <img
              src={info.image}
              alt={`${info.name} 미리보기`}
              width={640}
              height={480}
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : "auto"}
              decoding="async"
              onError={() => setImageFailed(true)}
              draggable={false}
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-blue-50 to-violet-50 text-blue-600 dark:from-blue-950/40 dark:to-violet-950/40 dark:text-blue-300">
              <span
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl font-black shadow-sm ring-1 ring-blue-100 dark:bg-slate-900 dark:ring-slate-700"
                aria-hidden="true"
              >
                {info.name.slice(0, 1)}
              </span>
              <span className="text-xs font-semibold">미리보기 준비 중</span>
            </div>
          )}
        </div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">
            {info.name}
          </h3>
          {info.category && (
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-slate-600 uppercase dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {categoryLabel[info.category]}
            </span>
          )}
        </div>
        {info.tags && (
          <p className="-mt-2 text-xs text-gray-500 italic dark:text-gray-400">
            {info.tags.join(", ")}
          </p>
        )}
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {info.description}
        </p>
      </article>
    </Link>
  );
};

export default ComponentCard;
