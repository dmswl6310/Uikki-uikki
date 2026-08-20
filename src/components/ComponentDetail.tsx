import { Link, Navigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { componentsData } from "@/data/componentsData";
import Examples from "./Examples";
import CodeTabs from "./common/CodeTabs";
import PropsTable from "./PropsTable";
import { useSEO } from "@/hooks/useSEO";

import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";

const categoryLabel = {
  ui: "UI",
  blocks: "Blocks",
  templates: "Templates",
} as const;

// 간단한 HTML 포매터 (태그 사이에 줄바꿈과 들여쓰기 추가)
const formatHTML = (html: string) => {
  let formatted = "";
  let indent = "";

  html.split(/>\s*</).forEach((element) => {
    if (element.match(/^\/\w/)) {
      indent = indent.substring(2);
    }

    formatted += indent + "<" + element + ">\n";

    // input, img, br, hr 등의 닫는 태그가 없는 태그는 들여쓰기를 증가시키지 않음
    if (
      element.match(/^<?\w[^>]*[^/]$/) &&
      !element.startsWith("input") &&
      !element.startsWith("img") &&
      !element.startsWith("br") &&
      !element.startsWith("hr") &&
      !element.startsWith("path") &&
      !element.startsWith("circle") &&
      !element.startsWith("line") &&
      !element.startsWith("polyline")
    ) {
      indent += "  ";
    }
  });

  return formatted.substring(1, formatted.length - 2).trim();
};

const ComponentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const normalizedId = id === "button1" ? "button" : id;
  const detail = componentsData.find((c) => c.id === normalizedId);

  // SEO 메타 태그 동적 변경 (detail이 있을 때만 적용, 없으면 useSEO 훅 내부 로직과 타이밍 이슈 없도록)
  useSEO({
    title: detail ? detail.name : "Not Found",
    description: detail ? detail.description : "컴포넌트를 찾을 수 없습니다.",
  });

  if (!detail) return <Navigate to="/not-found" replace />;

  const htmlCode =
    detail.Component && detail.examples.length > 0
      ? formatHTML(
          renderToStaticMarkup(
            createElement(detail.Component, detail.examples[0]),
          ),
        )
      : "";

  return (
    <div className="animate-fade-up mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          to="/components"
          className="mb-6 inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900 dark:border-slate-700 dark:bg-slate-900 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
        >
          <ChevronLeft size={16} className="mr-1" />
          목록으로 돌아가기
        </Link>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-slate-100">
          {detail.name}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-500 dark:text-gray-400">
          {detail.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {detail.category && (
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {categoryLabel[detail.category]}
            </span>
          )}
          {detail.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 border-b border-gray-200 dark:border-slate-800"></div>

      <div className="mt-12 mb-20 grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="space-y-16 lg:col-span-7">
          <section>
            <div className="mb-6 flex items-center gap-2">
              <div className="h-6 w-1.5 rounded-full bg-blue-600"></div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                미리보기 및 테스트
              </h2>
            </div>
            <Examples componentInfo={detail} examples={detail.examples} />
          </section>

          {(detail.usage ||
            (detail.propControls &&
              Object.keys(detail.propControls).length > 0)) && (
            <section id="documentation">
              <div className="mb-6 flex items-center gap-2">
                <div className="h-6 w-1.5 rounded-full bg-indigo-500"></div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                  컴포넌트 문서
                </h2>
              </div>

              {detail.usage && (
                <div className="mb-10 max-w-none rounded-2xl border border-gray-100 bg-gray-50/50 p-6 text-gray-600 dark:border-slate-800 dark:bg-slate-900 dark:text-gray-300">
                  {detail.usage.split("\n").map((line, i) => (
                    <p key={i} className="mb-2 leading-relaxed last:mb-0">
                      {line}
                    </p>
                  ))}
                </div>
              )}

              {detail.propControls &&
                Object.keys(detail.propControls).length > 0 && (
                  <div>
                    <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-slate-100">
                      Properties (Props)
                    </h3>
                    <PropsTable controls={detail.propControls} />
                  </div>
                )}
            </section>
          )}
        </div>

        <div className="lg:col-span-5">
          <section className="sticky top-24 mt-8 h-[calc(100vh-8rem)] lg:mt-0">
            <div className="mb-6 flex items-center gap-2">
              <div className="h-6 w-1.5 rounded-full bg-gray-900 dark:bg-slate-100"></div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                소스 코드
              </h2>
            </div>
            <div className="flex h-[calc(100%-3rem)] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-colors hover:border-gray-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
              <CodeTabs
                code={detail.code}
                codeJs={detail.codeJs}
                htmlCode={htmlCode}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ComponentDetail;
