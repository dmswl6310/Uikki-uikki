import PageTitle from "@/components/common/PageTitle";
import { useSEO } from "@/hooks/useSEO";
import {
  Terminal,
  Copy,
  Download,
  CheckCircle2,
  SlidersHorizontal,
  MousePointerClick,
} from "lucide-react";
import { useState } from "react";

const Guide = () => {
  const [mockVariant, setMockVariant] = useState<"default" | "outline">(
    "default",
  );
  const [mockSize, setMockSize] = useState(50);
  const [mockDisabled, setMockDisabled] = useState(false);
  useSEO({
    title: "사용 가이드",
    description:
      "Uikki 컴포넌트를 프로젝트에 설치하고 사용하는 방법을 안내합니다.",
  });

  return (
    <div className="animate-fade-up mx-auto max-w-4xl">
      <PageTitle
        title="도움말 및 가이드"
        description="Uikki 갤러리의 컴포넌트를 내 프로젝트에 가장 빠르고 우아하게 적용하는 방법을 알아보세요."
      />

      <div className="mt-8 flex flex-col gap-12">
        {/* Section 1: Introduction */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <Download size={24} />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">
              1. CLI로 한 번에 설치하기 (추천)
            </h2>
          </div>
          <p className="leading-relaxed text-gray-600 dark:text-gray-400">
            shadcn/ui의 철학을 본받아, 무거운 npm 패키지를 설치할 필요 없이{" "}
            <strong>
              원하는 컴포넌트의 소스 코드만 내 프로젝트로 쏙 빼오는
            </strong>{" "}
            CLI 도구를 제공합니다. 터미널에 아래 명령어만 치면 끝납니다!
          </p>

          <div className="group relative mt-2 flex items-center justify-between rounded-xl bg-gray-900 p-5 shadow-lg">
            <div className="flex items-center gap-3 font-mono text-sm text-gray-300 sm:text-base">
              <Terminal size={18} className="text-gray-500" />
              <span>
                <span className="text-blue-400">npx</span> -y uikki add{" "}
                <span className="text-emerald-400">button</span>
              </span>
            </div>
          </div>

          <div className="mt-2 rounded-xl border border-blue-100 bg-blue-50 p-5 text-sm text-blue-800 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
            <h4 className="mb-2 flex items-center gap-2 font-semibold">
              <CheckCircle2 size={16} /> CLI가 하는 일
            </h4>
            <ul className="ml-1 list-inside list-disc space-y-1 opacity-90">
              <li>Uikki 깃허브에서 원본 코드를 실시간으로 다운로드합니다.</li>
              <li>
                내 프로젝트의{" "}
                <code className="rounded bg-blue-100 px-1.5 py-0.5 dark:bg-blue-800/50">
                  src/components/ui
                </code>{" "}
                폴더 안에 파일을 예쁘게 만들어줍니다.
              </li>
              <li>바로 내 코드처럼 수정해서 쓸 수 있습니다!</li>
            </ul>
          </div>
        </section>

        {/* Section 2: Live Playground */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <SlidersHorizontal size={24} />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">
              2. 라이브 플레이그라운드 (실시간 테스트)
            </h2>
          </div>
          <p className="leading-relaxed text-gray-600 dark:text-gray-400">
            컴포넌트를 적용하기 전에 내 프로젝트에 맞는지 미리 확인해보세요.
            우측의 <strong>Props 패널</strong>을 조작하면 화면의 컴포넌트가
            실시간으로 변합니다!
          </p>

          <div className="mt-2 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:flex-row dark:border-slate-800 dark:bg-slate-900/50">
            {/* Mockup Left: Component View */}
            <div className="group relative flex flex-1 flex-col items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <div className="absolute top-3 left-3 flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-amber-400"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-400"></div>
              </div>
              <button
                type="button"
                disabled={mockDisabled}
                className={`mt-4 flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium shadow-lg transition-all duration-300 ${
                  mockVariant === "default"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border-2 border-blue-600 bg-white text-blue-600 hover:bg-blue-50"
                } ${
                  mockDisabled
                    ? "cursor-not-allowed opacity-50 grayscale"
                    : "animate-pulse cursor-pointer hover:scale-105"
                }`}
                style={{ transform: `scale(${mockSize / 50})` }}
              >
                <MousePointerClick size={16} /> Click Me
              </button>
            </div>

            {/* Mockup Right: Props Control */}
            <div className="flex w-full flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:w-64 dark:border-slate-800 dark:bg-slate-950">
              <h4 className="mb-2 border-b border-slate-100 pb-2 text-sm font-semibold text-slate-800 dark:border-slate-800 dark:text-slate-200">
                Props Control
              </h4>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Variant
                </label>
                <div className="flex gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
                  <button
                    type="button"
                    aria-pressed={mockVariant === "default"}
                    onClick={() => setMockVariant("default")}
                    className={`flex-1 rounded-md py-1 text-center text-xs font-medium transition-colors ${mockVariant === "default" ? "bg-white text-slate-800 shadow-sm dark:bg-slate-600 dark:text-slate-200" : "text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700"}`}
                  >
                    Default
                  </button>
                  <button
                    type="button"
                    aria-pressed={mockVariant === "outline"}
                    onClick={() => setMockVariant("outline")}
                    className={`flex-1 rounded-md py-1 text-center text-xs font-medium transition-colors ${mockVariant === "outline" ? "bg-white text-slate-800 shadow-sm dark:bg-slate-600 dark:text-slate-200" : "text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700"}`}
                  >
                    Outline
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Size
                  </label>
                  <span className="text-[10px] text-slate-400">
                    {mockSize}px
                  </span>
                </div>
                <input
                  aria-label="미리보기 버튼 크기"
                  type="range"
                  min="30"
                  max="80"
                  value={mockSize}
                  onChange={(e) => setMockSize(Number(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-blue-600 dark:bg-slate-700"
                />
              </div>

              <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-2 dark:border-slate-800">
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Disabled
                </label>
                <button
                  type="button"
                  role="switch"
                  aria-checked={mockDisabled}
                  onClick={() => setMockDisabled(!mockDisabled)}
                  className={`relative h-4 w-8 rounded-full transition-colors ${mockDisabled ? "bg-blue-500" : "bg-slate-300 dark:bg-slate-700"}`}
                >
                  <div
                    className={`absolute top-0.5 h-3 w-3 rounded-full bg-white shadow-sm transition-all ${mockDisabled ? "left-4.5" : "left-0.5"}`}
                    style={{ left: mockDisabled ? "1.125rem" : "0.125rem" }}
                  ></div>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Manual Copy */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <Copy size={24} />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">
              3. 직접 복사해서 사용하기
            </h2>
          </div>
          <p className="leading-relaxed text-gray-600 dark:text-gray-400">
            CLI를 쓰고 싶지 않거나, 특정 로직만 조금 참고하고 싶다면 화면에서
            직접 코드를 복사하셔도 됩니다.
          </p>

          <div className="mt-2 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 font-bold text-gray-600 dark:bg-slate-800 dark:text-gray-300">
                1
              </div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-slate-100">
                컴포넌트 탐색 및 테스트
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                원하는 컴포넌트를 찾아 클릭합니다. 놀이터(Playground) 화면에서
                실시간으로 테스트를 마쳤다면, 내 입맛에 맞는 속성(Props)이
                무엇인지 확인합니다.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 font-bold text-gray-600 dark:bg-slate-800 dark:text-gray-300">
                2
              </div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-slate-100">
                코드 복사 탭 클릭
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                화면 하단에 있는 <strong>[Code] 탭</strong>을 클릭합니다. 우측
                상단의 복사 버튼을 눌러 소스코드를 전체 복사한 뒤, 내 프로젝트에
                붙여넣습니다.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: FAQ */}
        <section className="flex flex-col gap-4">
          <h2 className="border-b border-gray-200 pb-4 text-2xl font-bold text-gray-900 dark:border-slate-800 dark:text-slate-100">
            자주 묻는 질문 (FAQ)
          </h2>

          <div className="mt-4 space-y-6">
            <div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-slate-100">
                Q. Tailwind CSS가 꼭 필요한가요?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                네, Uikki의 모든 컴포넌트는 Tailwind CSS 클래스 기반으로
                스타일링되어 있습니다. 프로젝트에 Tailwind CSS가 설치되어 있어야
                정상적으로 예쁘게 보입니다.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-slate-100">
                Q. 다른 라이브러리(Framer Motion 등)를 설치해야 하나요?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Tailwind CSS와 React는 필요하지만, 개별 UI 컴포넌트는 추가 UI
                런타임 패키지 없이 동작하도록 설계했습니다. Block과 Template은
                필요한 Uikki 하위 컴포넌트를 CLI가 함께 설치합니다.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-slate-100">
                Q. 다크 모드를 지원하나요?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                네, 지원합니다. 컴포넌트 코드 내부에{" "}
                <code className="text-blue-500">dark:bg-slate-900</code>와 같은
                Tailwind 다크 모드 클래스를 적용했습니다.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Guide;
