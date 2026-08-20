import { useEffect, useId, useRef, useState } from "react";

export type DropdownMenuItem = {
  id: string;
  label: string;
  description?: string;
  disabled?: boolean;
  danger?: boolean;
  separatorBefore?: boolean;
};

export type CustomDropdownMenuProps = {
  label?: string;
  items: DropdownMenuItem[];
  align?: "left" | "right";
  onSelect?: (itemId: string) => void;
};

export const CustomDropdownMenu = ({
  label = "메뉴 열기",
  items,
  align = "right",
  onSelect,
}: CustomDropdownMenuProps) => {
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const focusIntent = useRef<"first" | "last">("first");
  const [open, setOpen] = useState(false);

  const enabledItems = () =>
    itemRefs.current.filter(
      (item) => item && !item.disabled,
    ) as HTMLButtonElement[];

  const closeMenu = (restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const openMenu = (intent: "first" | "last" = "first") => {
    focusIntent.current = intent;
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;

    const frame = requestAnimationFrame(() => {
      const focusableItems = enabledItems();
      const target =
        focusIntent.current === "last"
          ? focusableItems.at(-1)
          : focusableItems[0];
      target?.focus();
    });

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) closeMenu();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  const moveFocus = (direction: 1 | -1) => {
    const focusableItems = enabledItems();
    if (!focusableItems.length) return;
    const currentIndex = focusableItems.indexOf(
      document.activeElement as HTMLButtonElement,
    );
    const nextIndex =
      (currentIndex + direction + focusableItems.length) %
      focusableItems.length;
    focusableItems[nextIndex].focus();
  };

  const handleMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      moveFocus(event.key === "ArrowDown" ? 1 : -1);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const focusableItems = enabledItems();
      (event.key === "Home"
        ? focusableItems[0]
        : focusableItems.at(-1)
      )?.focus();
    } else if (event.key === "Escape") {
      event.preventDefault();
      closeMenu(true);
    } else if (event.key === "Tab") {
      closeMenu();
    }
  };

  return (
    <div ref={rootRef} className="relative inline-block text-left">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => (open ? closeMenu() : openMenu())}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            openMenu(event.key === "ArrowUp" ? "last" : "first");
          }
        }}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-950"
      >
        {label}
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className="h-4 w-4 text-slate-400"
        >
          <circle cx="4" cy="10" r="1.5" />
          <circle cx="10" cy="10" r="1.5" />
          <circle cx="16" cy="10" r="1.5" />
        </svg>
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label={label}
          onKeyDown={handleMenuKeyDown}
          className={`absolute z-30 mt-2 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-900 ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {items.map((item, index) => (
            <div key={item.id}>
              {item.separatorBefore && (
                <div
                  role="separator"
                  className="my-1.5 h-px bg-slate-100 dark:bg-slate-800"
                />
              )}
              <button
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                type="button"
                role="menuitem"
                tabIndex={-1}
                disabled={item.disabled}
                onClick={() => {
                  onSelect?.(item.id);
                  closeMenu(true);
                }}
                className={`flex w-full items-start rounded-xl px-3 py-2.5 text-left transition focus:outline-none disabled:cursor-not-allowed disabled:opacity-45 ${
                  item.danger
                    ? "text-red-600 hover:bg-red-50 focus:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30 dark:focus:bg-red-950/30"
                    : "text-slate-700 hover:bg-slate-100 focus:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus:bg-slate-800"
                }`}
              >
                <span>
                  <span className="block text-sm font-semibold">
                    {item.label}
                  </span>
                  {item.description && (
                    <span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">
                      {item.description}
                    </span>
                  )}
                </span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
