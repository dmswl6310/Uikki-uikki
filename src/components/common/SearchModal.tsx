import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ChevronRight, Package, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { componentsCatalog } from "@/data/componentsCatalog";

type SearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const categoryLabel: Record<string, string> = {
  ui: "UI",
  blocks: "Blocks",
  templates: "Templates",
};

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const listboxId = useId();
  const navigate = useNavigate();

  const filteredComponents = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase().trim();

    return componentsCatalog.filter(
      (component) =>
        component.name.toLowerCase().includes(lowerQuery) ||
        component.id.toLowerCase().includes(lowerQuery) ||
        component.description.toLowerCase().includes(lowerQuery) ||
        component.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
        component.aliases?.some((alias) =>
          alias.toLowerCase().includes(lowerQuery),
        ),
    );
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    setQuery("");
    setActiveIndex(0);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 0);

    const handleDocumentKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleDocumentKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleDocumentKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [isOpen, onClose]);

  const openComponent = (id: string) => {
    void navigate(`/components/${id}`);
    onClose();
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % (filteredComponents.length || 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(
        (index) =>
          (index - 1 + (filteredComponents.length || 1)) %
          (filteredComponents.length || 1),
      );
    } else if (event.key === "Enter" && filteredComponents.length > 0) {
      event.preventDefault();
      openComponent(
        filteredComponents[activeIndex]?.id ?? filteredComponents[0].id,
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 px-4 pt-20 backdrop-blur-sm sm:pt-32">
      <button
        type="button"
        className="fixed inset-0 cursor-default"
        onClick={onClose}
        aria-label="검색 창 닫기"
      />
      <div
        ref={dialogRef}
        className="relative flex w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 dark:bg-slate-900 dark:ring-white/10"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <h2 id={titleId} className="sr-only">
          컴포넌트 검색
        </h2>
        <div className="flex items-center border-b border-gray-100 px-4 py-3 dark:border-slate-800">
          <Search size={20} className="mr-3 text-gray-400" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={filteredComponents.length > 0}
            aria-controls={listboxId}
            aria-activedescendant={
              filteredComponents.length > 0
                ? `${listboxId}-${activeIndex}`
                : undefined
            }
            className="flex-1 border-0 bg-transparent text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm dark:text-slate-100"
            placeholder="컴포넌트 이름, 설명 또는 태그 검색"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
          />
          <button
            type="button"
            onClick={onClose}
            className="ml-3 rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-slate-800 dark:hover:text-gray-200"
            aria-label="검색 창 닫기"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {query.trim() !== "" ? (
          <div className="max-h-[60vh] overflow-y-auto py-2">
            {filteredComponents.length > 0 ? (
              <ul id={listboxId} role="listbox" className="space-y-1 px-2">
                {filteredComponents.map((component, index) => (
                  <li
                    key={component.id}
                    role="option"
                    aria-selected={index === activeIndex}
                    id={`${listboxId}-${index}`}
                  >
                    <button
                      type="button"
                      onClick={() => openComponent(component.id)}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={`flex w-full items-center justify-between rounded-xl p-3 text-left transition-colors ${
                        index === activeIndex
                          ? "bg-blue-50 text-blue-900 dark:bg-blue-950/50 dark:text-blue-100"
                          : "text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-slate-800"
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-white text-gray-400 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                          <Package size={20} aria-hidden="true" />
                        </span>
                        <span className="flex min-w-0 flex-col">
                          <span className="text-sm font-semibold">
                            {component.name}
                          </span>
                          <span className="truncate text-xs text-gray-500 dark:text-gray-400">
                            {component.description}
                          </span>
                        </span>
                      </span>
                      <span className="ml-3 flex shrink-0 items-center gap-3">
                        {component.category && (
                          <span className="hidden rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500 sm:inline-block dark:bg-slate-800 dark:text-gray-400">
                            {categoryLabel[component.category] ??
                              component.category}
                          </span>
                        )}
                        <ChevronRight size={16} aria-hidden="true" />
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-14 text-center">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  ‘{query}’ 검색 결과가 없습니다.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="px-4 py-10 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              컴포넌트 이름, 설명, 태그로 검색해 보세요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
