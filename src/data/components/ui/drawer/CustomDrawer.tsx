import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEventHandler,
  type ReactElement,
  type ReactNode,
} from "react";

type DrawerTriggerProps = {
  onClick?: MouseEventHandler<HTMLElement>;
  "aria-haspopup"?: "dialog";
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
};

export type CustomDrawerProps = {
  isOpen?: boolean;
  onClose?: () => void;
  position?: "left" | "right" | "top" | "bottom";
  title?: string;
  children?: ReactNode;
  trigger?: ReactElement<DrawerTriggerProps>;
};

export const CustomDrawer = ({
  isOpen: controlledIsOpen,
  onClose,
  position = "right",
  title = "Drawer Title",
  children,
  trigger,
}: CustomDrawerProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const panelId = useId();
  const titleId = useId();

  const isControlled = controlledIsOpen !== undefined;
  const open = isControlled ? controlledIsOpen : internalIsOpen;

  const handleClose = useCallback(() => {
    if (!isControlled) setInternalIsOpen(false);
    onClose?.();
  }, [isControlled, onClose]);

  const handleOpen = () => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    if (!isControlled) setInternalIsOpen(true);
  };

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusableElements = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusableElements.length === 0) {
        event.preventDefault();
        panelRef.current.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && (activeElement === firstElement || activeElement === panelRef.current)) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [handleClose, open]);

  const positionClasses = {
    left: "left-0 top-0 h-full w-80 max-w-[80vw] border-r border-gray-200 dark:border-slate-800",
    right:
      "right-0 top-0 h-full w-80 max-w-[80vw] border-l border-gray-200 dark:border-slate-800",
    top: "left-0 top-0 h-80 max-h-[80vh] w-full border-b border-gray-200 dark:border-slate-800",
    bottom:
      "bottom-0 left-0 h-80 max-h-[80vh] w-full rounded-t-2xl border-t border-gray-200 dark:border-slate-800",
  };

  const triggerElement = isValidElement<DrawerTriggerProps>(trigger)
    ? cloneElement(trigger, {
        onClick: (event) => {
          trigger.props.onClick?.(event);
          handleOpen();
        },
        "aria-haspopup": "dialog",
        "aria-expanded": open,
        "aria-controls": panelId,
      })
    : null;

  return (
    <>
      {triggerElement}

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-50 cursor-default bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
            aria-label="드로어 닫기"
          />
          <div
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            className={`fixed z-[60] flex flex-col bg-white shadow-2xl outline-none dark:bg-slate-900 ${positionClasses[position]}`}
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-slate-800">
              <h2
                id={titleId}
                className="text-lg font-semibold text-gray-900 dark:text-slate-100"
              >
                {title}
              </h2>
              <button
                type="button"
                onClick={handleClose}
                className="flex h-11 w-11 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-slate-800 dark:hover:text-gray-300"
                aria-label="드로어 닫기"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 text-gray-600 dark:text-gray-400">
              {children || <p>Drawer Content goes here...</p>}
            </div>
          </div>
        </>
      )}
    </>
  );
};
