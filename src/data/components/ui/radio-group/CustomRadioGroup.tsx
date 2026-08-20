import { useEffect, useId, useState } from "react";

export type RadioOption = {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
};

export type CustomRadioGroupProps = {
  label?: string;
  options: RadioOption[];
  value?: string;
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
  onValueChange?: (value: string) => void;
};

export const CustomRadioGroup = ({
  label,
  options,
  value = "",
  orientation = "vertical",
  disabled = false,
  onValueChange,
}: CustomRadioGroupProps) => {
  const groupId = useId();
  const [internalValue, setInternalValue] = useState(value);
  const currentValue = onValueChange ? value : internalValue;

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const selectValue = (nextValue: string) => {
    if (!onValueChange) setInternalValue(nextValue);
    onValueChange?.(nextValue);
  };

  return (
    <fieldset className="min-w-0" disabled={disabled}>
      {label && (
        <legend className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
          {label}
        </legend>
      )}
      <div
        className={`flex gap-3 ${orientation === "horizontal" ? "flex-wrap" : "flex-col"}`}
      >
        {options.map((option) => {
          const optionId = `${groupId}-${option.value}`;
          const isChecked = currentValue === option.value;
          const isDisabled = disabled || option.disabled;

          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={`flex min-w-44 items-start gap-3 rounded-xl border p-3 transition-colors ${
                isChecked
                  ? "border-blue-500 bg-blue-50 dark:border-blue-500 dark:bg-blue-950/30"
                  : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600"
              } ${isDisabled ? "cursor-not-allowed opacity-55" : "cursor-pointer"}`}
            >
              <input
                id={optionId}
                type="radio"
                name={groupId}
                value={option.value}
                checked={isChecked}
                disabled={isDisabled}
                onChange={() => selectValue(option.value)}
                className="peer sr-only"
              />
              <span
                aria-hidden="true"
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2 dark:peer-focus-visible:ring-offset-slate-900 ${
                  isChecked
                    ? "border-blue-600 bg-blue-600"
                    : "border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-950"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full bg-white ${isChecked ? "opacity-100" : "opacity-0"}`}
                />
              </span>
              <span>
                <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {option.label}
                </span>
                {option.description && (
                  <span className="mt-1 block text-xs leading-5 text-slate-500 dark:text-slate-400">
                    {option.description}
                  </span>
                )}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
};
