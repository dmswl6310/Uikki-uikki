import { useId } from "react";

export type CustomInputProps = {
  label?: string;
  placeholder: string;
  type: "text" | "password" | "email";
  disabled: boolean;
};

export const CustomInput = ({
  label,
  placeholder,
  type = "text",
  disabled = false,
}: CustomInputProps) => {
  const isDisabled = String(disabled) === "true" || disabled === true;
  const inputId = useId();
  const visibleLabel = label || placeholder;

  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className="text-sm font-semibold text-gray-700 dark:text-gray-200"
      >
        {visibleLabel}
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
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
          className="text-gray-400"
        >
          <path d="M21.18 1.63a2 2 0 0 0-2.82 0l-9.5 9.5a2 2 0 0 0-.5.98l-.77 2.86a2 2 0 0 0 2.44 2.44l2.86-.77a2 2 0 0 0 .98-.5l9.5-9.5a2 2 0 0 0 0-2.82z" />
          <line x1="15" y1="5" x2="19" y2="9" />
        </svg>
        </div>
        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          disabled={isDisabled}
          className="block w-full rounded-xl border-0 bg-white py-3 pr-4 pl-10 text-gray-900 shadow-sm ring-1 ring-gray-200 transition-all ring-inset placeholder:text-gray-400 hover:ring-gray-300 focus:ring-2 focus:ring-blue-500 focus:ring-inset disabled:cursor-not-allowed disabled:bg-gray-50/50 disabled:text-gray-400 disabled:ring-gray-200 sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-slate-100 dark:ring-slate-700 dark:placeholder:text-gray-500 dark:hover:ring-slate-600 dark:disabled:bg-slate-800 dark:disabled:text-gray-500"
        />
      </div>
    </div>
  );
};
