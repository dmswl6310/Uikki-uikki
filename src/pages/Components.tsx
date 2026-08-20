import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import PageTitle from "@/components/common/PageTitle";
import ComponentList from "@/components/ComponentList";
import { componentsData } from "@/data/componentsData";
import { ComponentCategory } from "@/types/component.types";
import { useSEO } from "@/hooks/useSEO";

const categories: ComponentCategory[] = ["ui", "blocks", "templates"];

const categoryLabel: Record<ComponentCategory, string> = {
  ui: "UI",
  blocks: "Blocks",
  templates: "Templates",
};

const Components = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<ComponentCategory | null>(null);

  useSEO({
    title: "컴포넌트 목록",
    description:
      "프로젝트에 사용된 모든 UI 컴포넌트를 탐색하고 사용법을 확인하세요.",
  });

  // 모든 컴포넌트에서 고유한 태그 추출
  const availableTags = useMemo(() => {
    const tags = componentsData.flatMap((c) => c.tags || []);
    return Array.from(new Set(tags));
  }, []);

  const categoryCounts = useMemo(
    () =>
      categories.reduce(
        (acc, category) => {
          acc[category] = componentsData.filter(
            (component) => (component.category ?? "ui") === category,
          ).length;
          return acc;
        },
        { ui: 0, blocks: 0, templates: 0 } as Record<ComponentCategory, number>,
      ),
    [],
  );

  const filteredComponents = useMemo(() => {
    return componentsData.filter((comp) => {
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        query === "" ||
        comp.name.toLowerCase().includes(query) ||
        comp.id.toLowerCase().includes(query) ||
        comp.description.toLowerCase().includes(query) ||
        (comp.aliases &&
          comp.aliases.some((alias) => alias.toLowerCase().includes(query))) ||
        (comp.tags &&
          comp.tags.some((tag) => tag.toLowerCase().includes(query)));

      const matchTag = selectedTag ? comp.tags?.includes(selectedTag) : true;
      const matchCategory = selectedCategory
        ? (comp.category ?? "ui") === selectedCategory
        : true;

      return matchSearch && matchTag && matchCategory;
    });
  }, [searchQuery, selectedTag, selectedCategory]);

  return (
    <div className="animate-fade-up">
      <PageTitle
        title="컴포넌트 목록"
        description="프로젝트에 사용된 모든 UI 컴포넌트를 탐색하고 사용법을 확인하세요."
      />

      <div className="mb-8 flex flex-col gap-6">
        <div className="flex flex-wrap gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
              selectedCategory === null
                ? "bg-gray-900 text-white shadow-sm"
                : "bg-white text-gray-600 hover:bg-gray-50 dark:bg-slate-900 dark:text-gray-300 dark:hover:bg-slate-800"
            }`}
          >
            전체
          </button>
          {categories.map((category) => {
            const count = categoryCounts[category];
            const isActive = selectedCategory === category;

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-300 dark:hover:bg-blue-950/70"
                } ${count === 0 ? "opacity-60" : ""}`}
              >
                {categoryLabel[category]} · {count}
              </button>
            );
          })}
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <Search size={20} className="text-gray-400" />
          </div>
          <input
            type="search"
            aria-label="컴포넌트 검색"
            className="block w-full rounded-2xl border-0 bg-white py-4 pr-12 pl-12 text-gray-900 shadow-sm ring-1 ring-gray-200 transition-shadow ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 focus:ring-inset sm:text-lg sm:leading-6 dark:bg-slate-900 dark:text-slate-100 dark:ring-slate-700"
            placeholder="이름이나 설명으로 검색하세요..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-slate-100"
              aria-label="검색어 지우기"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
              selectedTag === null
                ? "bg-gray-900 text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700"
            }`}
          >
            전체
          </button>
          {availableTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                selectedTag === tag
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-300 dark:hover:bg-blue-950/70"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {filteredComponents.length > 0 ? (
        <ComponentList items={filteredComponents} />
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-20 text-center dark:border-slate-700 dark:bg-slate-900">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-gray-300 shadow-sm ring-1 ring-gray-100 dark:bg-slate-800 dark:ring-slate-700">
            <Search size={32} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100">
            결과가 없습니다
          </h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            다른 검색어나 태그를 선택해 보세요.
          </p>
        </div>
      )}
    </div>
  );
};

export default Components;
