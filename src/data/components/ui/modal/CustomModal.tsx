import { useId } from "react";

export type CustomModalProps = {
  title: string;
  description: string;
  confirmText: string;
  onClose?: () => void;
  onConfirm?: () => void;
};

export const CustomModal = ({
  title,
  description,
  confirmText,
  onClose,
  onConfirm,
}: CustomModalProps) => {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <div
      className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 dark:bg-slate-900 dark:ring-white/10"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      {/* Header */}
      <div className="flex items-start justify-between border-b border-gray-100 p-6 dark:border-slate-800">
        <div>
          <h3
            id={titleId}
            className="text-lg font-bold text-gray-900 dark:text-slate-100"
          >
            {title}
          </h3>
          <p
            id={descriptionId}
            className="mt-1.5 text-sm leading-relaxed text-gray-500 dark:text-gray-400"
          >
            {description}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-slate-800 dark:hover:text-gray-200"
          aria-label="모달 닫기"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
      {/* Footer */}
      <div className="flex items-center justify-end gap-3 bg-gray-50/80 px-6 py-4 dark:bg-slate-800/60">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-900 dark:text-gray-300 dark:hover:bg-slate-800"
        >
          취소
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
};
