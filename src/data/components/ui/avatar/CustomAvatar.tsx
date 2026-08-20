export type CustomAvatarProps = {
  name: string;
  size: "sm" | "md" | "lg";
  online: boolean;
};

const COLORS = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-teal-500",
  "bg-orange-500",
  "bg-pink-500",
  "bg-indigo-500",
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const getColor = (name: string) =>
  COLORS[(name.charCodeAt(0) || 0) % COLORS.length];

export const CustomAvatar = ({
  name,
  size = "md",
  online = false,
}: CustomAvatarProps) => {
  const isOnline = String(online) === "true" || online === true;

  const sizeMap = {
    sm: { box: "w-8 h-8", text: "text-xs", dot: "w-2 h-2 border" },
    md: { box: "w-11 h-11", text: "text-sm", dot: "w-3 h-3 border-2" },
    lg: { box: "w-16 h-16", text: "text-lg", dot: "w-4 h-4 border-2" },
  };

  const s = sizeMap[size] || sizeMap.md;

  return (
    <div
      className="relative inline-flex shrink-0"
      role="img"
      aria-label={`${name} 아바타${isOnline ? ", 온라인" : ""}`}
    >
      <div
        className={`${s.box} ${getColor(name)} flex items-center justify-center rounded-full font-bold text-white ${s.text}`}
      >
        {getInitials(name) || "?"}
      </div>
      {isOnline && (
        <span
          className={`absolute right-0 bottom-0 ${s.dot} rounded-full border-white bg-green-500 dark:border-slate-900`}
          aria-hidden="true"
        />
      )}
    </div>
  );
};
