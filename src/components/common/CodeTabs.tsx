import { useState } from "react";
import CodeBlock from "./CodeBlock";
import { EyeOff, Eye } from "lucide-react";

type TabType = "typescript" | "javascript" | "html";

const processCode = (rawCode: string, isHtml: boolean, hide: boolean) => {
  if (!hide || !rawCode) return rawCode;
  let processed = rawCode;
  if (isHtml) {
    processed = processed.replace(/\s+class="[^"]*"/g, '');
  } else {
    processed = processed.replace(/\s+className="[^"]*"/g, '');
    processed = processed.replace(/\s+className=\{[^}]*\}/g, '');
  }
  return processed;
};

const CodeTabs = ({ code, codeJs, htmlCode }: { code: string; codeJs?: string; htmlCode?: string }) => {
  const [tab, setTab] = useState<TabType>("typescript");
  const [hideStyles, setHideStyles] = useState(false);

  const rawCodeString = tab === "html" && htmlCode ? htmlCode : tab === "javascript" && codeJs ? codeJs : code;
  const displayCodeString = processCode(rawCodeString, tab === "html", hideStyles);

  return (
    <div className="flex h-full min-h-0 flex-col bg-white dark:bg-slate-900">
      <div className="flex shrink-0 flex-col border-b border-gray-100 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
        <div
          className="flex min-w-0 gap-4 overflow-x-auto px-4 pt-3"
          role="tablist"
          aria-label="소스 언어"
        >
          <button
            type="button"
            role="tab"
            aria-selected={tab === "typescript"}
            tabIndex={tab === "typescript" ? 0 : -1}
            onClick={() => setTab("typescript")}
            className={`pb-3 px-1 text-sm font-medium transition-all relative whitespace-nowrap ${tab === 'typescript' ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'}`}
          >
            React (TS)
            {tab === 'typescript' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-gray-100 rounded-t-full"></div>}
          </button>
          {codeJs && (
            <button
              type="button"
              role="tab"
              aria-selected={tab === "javascript"}
              tabIndex={tab === "javascript" ? 0 : -1}
              onClick={() => setTab("javascript")}
              className={`pb-3 px-1 text-sm font-medium transition-all relative whitespace-nowrap ${tab === 'javascript' ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'}`}
            >
              React (JS)
              {tab === 'javascript' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-gray-100 rounded-t-full"></div>}
            </button>
          )}
          {htmlCode && (
            <button
              type="button"
              role="tab"
              aria-selected={tab === "html"}
              tabIndex={tab === "html" ? 0 : -1}
              onClick={() => setTab("html")}
              className={`pb-3 px-1 text-sm font-medium transition-all relative whitespace-nowrap ${tab === 'html' ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'}`}
            >
              HTML
              {tab === 'html' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-gray-100 rounded-t-full"></div>}
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={() => setHideStyles(!hideStyles)}
          aria-pressed={hideStyles}
          aria-label={hideStyles ? "스타일 표시" : "스타일 숨기기"}
          className={`m-2 flex min-h-10 shrink-0 items-center gap-1.5 self-start rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors sm:self-auto ${hideStyles ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50' : 'bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-700 dark:hover:text-gray-200'}`}
          title={hideStyles ? "스타일 표시하기" : "스타일 숨기고 로직만 보기"}
        >
          {hideStyles ? <Eye size={14} /> : <EyeOff size={14} />}
          <span className="hidden sm:inline">
            {hideStyles ? "스타일 표시" : "스타일 숨기기"}
          </span>
        </button>
      </div>
      <div
        className="relative min-h-0 flex-1"
        role="tabpanel"
        aria-label={`${tab === "typescript" ? "React TypeScript" : tab === "javascript" ? "React JavaScript" : "HTML"} 소스`}
      >
         <CodeBlock code={displayCodeString} language={tab} />
      </div>
    </div>
  );
};

export default CodeTabs;
