import { Link } from "react-router-dom";
import { ArrowRight, LayoutTemplate, Zap, Palette } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const Home = () => {
  useSEO({
    title: "Uikki Gallery",
    description:
      "UI 컴포넌트를 위한 전용 플레이그라운드입니다. 라이브 프리뷰와 깔끔한 코드 조각으로 React 컴포넌트를 탐색하세요.",
  });

  return (
    <div className="animate-fade-up flex flex-col gap-24 py-12 lg:py-24">
      <section className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 dark:bg-blue-950/40 dark:text-blue-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
          </span>
          v1.0 업데이트 완료
        </div>
        <h1 className="text-5xl leading-tight font-extrabold tracking-tight break-keep text-gray-900 lg:text-7xl dark:text-slate-100">
          당신의 UI 설계를 <br />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            더 빠르고 유연하게
          </span>
        </h1>
        <p className="max-w-2xl px-4 text-lg font-light break-keep text-gray-600 lg:text-xl dark:text-gray-300">
          UI 컴포넌트를 위한 전용 플레이그라운드입니다. 라이브 프리뷰와 깔끔한
          코드 조각으로 React 컴포넌트를 탐색하고 즉시 프로젝트에 적용해 보세요.
        </p>
        <div className="mt-4 flex w-full flex-col items-center gap-4 px-4 sm:w-auto sm:flex-row">
          <Link
            to="/components"
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-gray-900 px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-xl sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-500"
          >
            컴포넌트 둘러보기
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
          <a
            href="https://github.com/dmswl6310/Uikki-uikki"
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-200 transition-all ring-inset hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow-md sm:w-auto dark:bg-slate-900 dark:text-slate-100 dark:ring-slate-700 dark:hover:bg-slate-800"
          >
            Github
          </a>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 break-keep md:grid-cols-3">
        {[
          {
            icon: LayoutTemplate,
            title: "바로 사용 가능",
            desc: "Tailwind CSS가 설정된 React 프로젝트에서 추가 UI 런타임 패키지 없이 사용할 수 있는 소스를 제공합니다.",
          },
          {
            icon: Zap,
            title: "라이브 프리뷰",
            desc: "코드를 복사하기 전, 샌드박스에서 컴포넌트의 Props 값들을 직접 변경하며 상호작용 결과를 확인해보세요.",
          },
          {
            icon: Palette,
            title: "깔끔한 디자인",
            desc: "모바일·데스크톱 폭과 라이트·다크 테마를 바꿔가며 UI를 검증할 수 있습니다.",
          },
        ].map((feature) => (
          <article
            key={feature.title}
            className="flex flex-col items-center gap-4 rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-gray-100 transition-all hover:-translate-y-1 hover:shadow-md dark:bg-slate-900 dark:ring-slate-800"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-300">
              <feature.icon size={24} aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">
              {feature.title}
            </h3>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {feature.desc}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Home;
