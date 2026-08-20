import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-gray-100 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 font-semibold tracking-tight text-gray-900 dark:text-slate-100">
          Uikki<span className="text-blue-600">✦</span>Uikki
        </div>
        <p className="text-center text-sm text-gray-500 sm:text-left dark:text-gray-400">
          &copy; {new Date().getFullYear()} 황은지가 디자인하고 개발했습니다.
        </p>
        <div className="flex gap-4">
          <Link
            to="/"
            className="text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-slate-100"
          >
            홈
          </Link>
          <Link
            to="/components"
            className="text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-slate-100"
          >
            컴포넌트 목록
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
