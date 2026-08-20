export type CustomToastProps = {
  message: string;
  variant: "success" | "error" | "info" | "warning";
};

type IconBaseProps = { size?: number; className?: string };

const IconProps = ({ size = 20, className = "" }: IconBaseProps) => ({
  xmlns: "http://www.w3.org/2000/svg",
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className,
});

const CheckCircle = (props: IconBaseProps) => (
  <svg {...IconProps(props)}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="M22 4L12 14.01l-3-3" />
  </svg>
);
const XCircle = (props: IconBaseProps) => (
  <svg {...IconProps(props)}>
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6" />
    <path d="m9 9 6 6" />
  </svg>
);
const Info = (props: IconBaseProps) => (
  <svg {...IconProps(props)}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);
const AlertTriangle = (props: IconBaseProps) => (
  <svg {...IconProps(props)}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);

const config = {
  success: {
    icon: CheckCircle,
    bg: "bg-green-50 dark:bg-green-950/70",
    border: "border-green-200 dark:border-green-800",
    icon_color: "text-green-500",
    text: "text-green-800 dark:text-green-200",
  },
  error: {
    icon: XCircle,
    bg: "bg-red-50 dark:bg-red-950/70",
    border: "border-red-200 dark:border-red-800",
    icon_color: "text-red-500",
    text: "text-red-800 dark:text-red-200",
  },
  info: {
    icon: Info,
    bg: "bg-blue-50 dark:bg-blue-950/70",
    border: "border-blue-200 dark:border-blue-800",
    icon_color: "text-blue-500",
    text: "text-blue-800 dark:text-blue-200",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-amber-50 dark:bg-amber-950/70",
    border: "border-amber-200 dark:border-amber-800",
    icon_color: "text-amber-500",
    text: "text-amber-800 dark:text-amber-200",
  },
};

export const CustomToast = ({
  message,
  variant = "info",
}: CustomToastProps) => {
  const c = config[variant] || config.info;
  const Icon = c.icon;

  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={`flex w-full max-w-sm items-center gap-3 rounded-2xl border px-4 py-3.5 shadow-lg ${c.bg} ${c.border}`}
    >
      <Icon size={20} className={`shrink-0 ${c.icon_color}`} />
      <p className={`text-sm font-medium ${c.text}`}>{message}</p>
    </div>
  );
};
