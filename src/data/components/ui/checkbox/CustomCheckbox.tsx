import { useEffect, useId, useRef, useState } from "react";

export type CustomCheckboxProps = {
  label: string;
  description?: string;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

export const CustomCheckbox = ({
  label,
  description,
  checked = false,
  indeterminate = false,
  disabled = false,
  onCheckedChange,
}: CustomCheckboxProps) => {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [internalChecked, setInternalChecked] = useState(checked);
  const currentChecked = onCheckedChange ? checked : internalChecked;

  useEffect(() => {
    setInternalChecked(checked);
  }, [checked]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const handleChange = (nextChecked: boolean) => {
    if (!onCheckedChange) setInternalChecked(nextChecked);
    onCheckedChange?.(nextChecked);
  };

  return (
    <label
      htmlFor={inputId}
      className={`inline-flex max-w-sm items-start gap-3 rounded-xl p-1 select-none ${
        disabled ? "cursor-not-allowed opacity-55" : "cursor-pointer"
      }`}
    >
      <input
        ref={inputRef}
        id={inputId}
        type="checkbox"
        checked={currentChecked}
        disabled={disabled}
        onChange={(event) => handleChange(event.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2 dark:peer-focus-visible:ring-offset-slate-900 ${
          currentChecked || indeterminate
            ? "border-blue-600 bg-blue-600 text-white"
            : "border-slate-300 bg-white text-transparent dark:border-slate-600 dark:bg-slate-900"
        }`}
      >
        {indeterminate ? (
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
            <path
              d="M3 8h10"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
            <path
              d="m3 8 3 3 7-7"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        )}
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100">
          {label}
        </span>
        {description && (
          <span className="mt-1 block text-sm leading-5 text-slate-500 dark:text-slate-400">
            {description}
          </span>
        )}
      </span>
    </label>
  );
};
