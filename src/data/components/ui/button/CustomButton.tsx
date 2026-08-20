export type CustomButtonProps = {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
};

export const CustomButton = ({
  label,
  disabled = false,
  onClick,
}: CustomButtonProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-400 dark:focus-visible:ring-offset-slate-900"
    >
      {label}
    </button>
  );
};
