import { lazy, Suspense, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Moon, Package, Search, Sun, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const SearchModal = lazy(() => import("./SearchModal"));

const navigation = [
  { to: "/components", label: "컴포넌트 목록" },
  { to: "/guide", label: "가이드" },
];

const Header = () => {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md transition-all duration-300 dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
            aria-label="Uikki 홈"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
              <Package size={20} aria-hidden="true" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-slate-100">
              Uikki<span className="text-blue-600 dark:text-blue-400">✦</span>
              Uikki
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <nav
              className="hidden items-center gap-6 md:flex"
              aria-label="주요 메뉴"
            >
              {navigation.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                    isActive(item.to)
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="flex h-9 items-center gap-2 rounded-full px-3 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-gray-100"
                aria-label="컴포넌트 검색 열기"
                title="검색 (Ctrl+K)"
              >
                <Search size={18} aria-hidden="true" />
                <span className="hidden rounded border border-gray-200 bg-gray-100 px-1.5 py-0.5 text-xs font-semibold text-gray-400 sm:inline-block dark:border-gray-700 dark:bg-slate-800 dark:text-gray-500">
                  Ctrl K
                </span>
              </button>
              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-gray-100"
                aria-label={
                  theme === "dark" ? "라이트 모드로 변경" : "다크 모드로 변경"
                }
              >
                {theme === "dark" ? (
                  <Sun size={18} aria-hidden="true" />
                ) : (
                  <Moon size={18} aria-hidden="true" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((open) => !open)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 md:hidden dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-gray-100"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation"
                aria-label={
                  isMobileMenuOpen ? "모바일 메뉴 닫기" : "모바일 메뉴 열기"
                }
              >
                {isMobileMenuOpen ? (
                  <X size={20} aria-hidden="true" />
                ) : (
                  <Menu size={20} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav
            id="mobile-navigation"
            className="border-t border-gray-100 bg-white px-4 py-3 md:hidden dark:border-slate-800 dark:bg-slate-950"
            aria-label="모바일 메뉴"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold ${
                    isActive(item.to)
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
                      : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      {isSearchOpen && (
        <Suspense fallback={null}>
          <SearchModal isOpen onClose={() => setIsSearchOpen(false)} />
        </Suspense>
      )}
    </>
  );
};

export default Header;
