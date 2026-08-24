import copy from "copy-to-clipboard";
import { useState } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import markup from "react-syntax-highlighter/dist/esm/languages/prism/markup";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import {
  oneLight,
  oneDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check, Download } from "lucide-react";
import { useToast } from "./ToastProvider";
import { useTheme } from "./ThemeProvider";

SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("html", markup);

type CodeBlockProps = {
  code: string;
  language?: string;
};

const CodeBlock = ({ code, language }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const { theme } = useTheme();

  const handleCopy = () => {
    copy(code);
    setCopied(true);
    toast("✅ 클립보드에 복사되었습니다.", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const extension =
      language === "html" ? "html" : language === "javascript" ? "jsx" : "tsx";
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Component.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast("📦 소스 코드가 다운로드되었습니다.", "success");
  };

  const isDarkMode =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <div
      className="group relative h-full min-h-0 w-full overflow-auto text-sm focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
      role="region"
      aria-label="소스 코드"
      tabIndex={0}
    >
      <div className="absolute top-3 right-3 z-10 flex gap-2">
        <button
          onClick={handleDownload}
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white/90 text-gray-500 shadow-sm backdrop-blur-sm transition-colors hover:bg-white hover:text-gray-900 focus:ring-2 focus:ring-blue-500/50 focus:outline-none sm:h-9 sm:w-9 dark:border-slate-700 dark:bg-slate-800/90 dark:text-gray-400 dark:hover:bg-slate-700 dark:hover:text-gray-100"
          aria-label="소스 코드 다운로드"
          title="소스 코드 다운로드"
        >
          <Download size={14} />
        </button>
        <button
          onClick={handleCopy}
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white/90 text-gray-500 shadow-sm backdrop-blur-sm transition-colors hover:bg-white hover:text-gray-900 focus:ring-2 focus:ring-blue-500/50 focus:outline-none sm:h-9 sm:w-9 dark:border-slate-700 dark:bg-slate-800/90 dark:text-gray-400 dark:hover:bg-slate-700 dark:hover:text-gray-100"
          aria-label={copied ? "복사 완료" : "소스 코드 복사"}
          title="코드 복사"
        >
          {copied ? (
            <Check size={14} className="text-green-600 dark:text-green-400" />
          ) : (
            <Copy size={14} />
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={isDarkMode ? oneDark : oneLight}
        customStyle={{
          margin: 0,
          padding: "1.25rem",
          fontSize: "0.875rem",
          backgroundColor: isDarkMode ? "#0f172a" : "#ffffff",
          fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
          minWidth: "max-content",
          overflow: "visible",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
