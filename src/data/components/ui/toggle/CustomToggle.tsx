export type CustomToggleProps = {
  label: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
};

export const CustomToggle = ({
  label,
  checked,
  onChange,
}: CustomToggleProps) => {
  const isChecked = String(checked) === "true" || checked === true;

  return (
    <label className="group inline-flex cursor-pointer items-center gap-3 select-none">
      <input
        type="checkbox"
        className="peer sr-only"
        checked={isChecked}
        readOnly={!onChange}
        onChange={(event) => onChange?.(event.target.checked)}
      />
      <span
        className={`relative h-6 w-12 rounded-full transition-colors duration-300 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2 dark:peer-focus-visible:ring-offset-slate-900 ${isChecked ? "bg-blue-600" : "bg-gray-200 dark:bg-slate-700"}`}
        aria-hidden="true"
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${isChecked ? "translate-x-6" : "translate-x-0"}`}
        />
      </span>
      {label && (
        <span
          className={`text-sm font-medium transition-colors ${isChecked ? "text-gray-900 dark:text-slate-100" : "text-gray-500 dark:text-gray-400"}`}
        >
          {label}
        </span>
      )}
    </label>
  );
};
