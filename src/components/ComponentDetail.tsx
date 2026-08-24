import { Link, Navigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { loadComponent } from "@/data/componentLoaders";
import type { RegisteredComponentInfo } from "@/types/component.types";
import Examples from "./Examples";
import PropsTable from "./PropsTable";
import { useSEO } from "@/hooks/useSEO";

import { lazy, Suspense, useEffect, useRef, useState } from "react";

const SourceCodePanel = lazy(() => import("./SourceCodePanel"));

const categoryLabel = {
  ui: "UI",
  blocks: "Blocks",
  templates: "Templates",
} as const;

type ComponentLoadState = {
  id?: string;
  status: "loading" | "ready" | "not-found" | "error";
  detail?: RegisteredComponentInfo;
};

const ComponentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const normalizedId = id === "button1" ? "button" : id;
  const [loadState, setLoadState] = useState<ComponentLoadState>({
    status: "loading",
  });
  const detail = loadState.detail;
  const sourceSectionRef = useRef<HTMLElement>(null);
  const [shouldLoadSource, setShouldLoadSource] = useState(false);

  useEffect(() => {
    let active = true;
    setLoadState({ id: normalizedId, status: "loading" });

    if (!normalizedId) {
      setLoadState({ id: normalizedId, status: "not-found" });
      return () => {
        active = false;
      };
    }

    void loadComponent(normalizedId)
      .then((component) => {
        if (!active) return;
        setLoadState({
          id: normalizedId,
          status: component ? "ready" : "not-found",
          detail: component,
        });
      })
      .catch(() => {
        if (active) setLoadState({ id: normalizedId, status: "error" });
      });

    return () => {
      active = false;
    };
  }, [normalizedId]);

  useEffect(() => {
    if (!detail || shouldLoadSource || !sourceSectionRef.current) return;

    if (!("IntersectionObserver" in window)) {
      setShouldLoadSource(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoadSource(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" },
    );

    observer.observe(sourceSectionRef.current);
    return () => observer.disconnect();
  }, [detail, shouldLoadSource]);

  // SEO 메타 태그 동적 변경 (detail이 있을 때만 적용, 없으면 useSEO 훅 내부 로직과 타이밍 이슈 없도록)
  useSEO({
    title: detail ? detail.name : "Not Found",
    description: detail ? detail.description : "컴포넌트를 찾을 수 없습니다.",
  });

  const isLoading =
    loadState.id !== normalizedId || loadState.status === "loading";

  if (isLoading) {
    return (
      <div
        role="status"
        className="py-24 text-center text-sm text-gray-500 dark:text-gray-400"
      >
        컴포넌트를 불러오는 중입니다…
      </div>
    );
  }

  if (loadState.status === "error") {
    return (
      <div className="mx-auto max-w-lg py-24 text-center">
        <h1 className="text-xl font-bold text-gray-900 dark:text-slate-100">
          컴포넌트를 불러오지 못했습니다
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          잠시 후 페이지를 새로고침해 주세요.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (loadState.status === "not-found" || !detail) {
    return <Navigate to="/not-found" replace />;
  }

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

        <div className="min-w-0 lg:col-span-5">
          <section
            ref={sourceSectionRef}
            className="mt-8 flex h-[min(42rem,calc(100vh-6rem))] min-h-[28rem] flex-col lg:sticky lg:top-24 lg:mt-0 lg:h-[calc(100vh-8rem)]"
          >
            <div className="mb-6 flex shrink-0 items-center gap-2">
              <div className="h-6 w-1.5 rounded-full bg-gray-900 dark:bg-slate-100"></div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                소스 코드
              </h2>
            </div>
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-colors hover:border-gray-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
              {shouldLoadSource ? (
                <Suspense
                  fallback={
                    <div
                      role="status"
                      className="flex h-full items-center justify-center text-sm text-gray-500 dark:text-gray-400"
                    >
                      소스 뷰어를 준비하는 중입니다…
                    </div>
                  }
                >
                  <SourceCodePanel detail={detail} />
                </Suspense>
              ) : (
                <div className="flex h-full items-center justify-center px-6 text-center text-sm text-gray-500 dark:text-gray-400">
                  소스 영역에 가까워지면 코드를 불러옵니다.
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ComponentDetail;
