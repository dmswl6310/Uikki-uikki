import { useEffect, useId, useState } from "react";

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type CustomSelectProps = {
  label: string;
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
};

export const CustomSelect = ({
  label,
  options,
  value = "",
  placeholder = "옵션을 선택하세요",
  helperText,
  error,
  disabled = false,
  onValueChange,
}: CustomSelectProps) => {
  const selectId = useId();
  const descriptionId = `${selectId}-description`;
  const [internalValue, setInternalValue] = useState(value);
  const currentValue = onValueChange ? value : internalValue;

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = (nextValue: string) => {
    if (!onValueChange) setInternalValue(nextValue);
    onValueChange?.(nextValue);
  };

  return (
    <div className="w-full max-w-sm">
      <label
        htmlFor={selectId}
        className="mb-2 block text-sm font-semibold text-slate-900 dark:text-slate-100"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={selectId}
          value={currentValue}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={helperText || error ? descriptionId : undefined}
          onChange={(event) => handleChange(event.target.value)}
          className={`w-full appearance-none rounded-xl border bg-white px-4 py-3 pr-11 text-sm font-medium text-slate-900 shadow-sm transition outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 dark:bg-slate-900 dark:text-slate-100 dark:disabled:bg-slate-800 ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500"
              : "border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-slate-700"
          }`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-slate-400"
        >
          <path
            d="m6 8 4 4 4-4"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        </svg>
      </div>
      {(error || helperText) && (
        <p
          id={descriptionId}
          className={`mt-2 text-xs ${error ? "text-red-600 dark:text-red-400" : "text-slate-500 dark:text-slate-400"}`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
};
