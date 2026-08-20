import type {
  ComponentCatalogItem,
  ComponentCategory,
} from "@/types/component.types";

type ComponentMeta = Omit<ComponentCatalogItem, "id" | "category"> & {
  category?: ComponentCategory;
};

type ComponentMetaModule = Record<string, unknown>;

const metaModules = import.meta.glob<ComponentMetaModule>(
  "./components/*/*/meta.ts",
  { eager: true },
);

const isComponentMeta = (value: unknown): value is ComponentMeta =>
  typeof value === "object" &&
  value !== null &&
  "name" in value &&
  typeof value.name === "string" &&
  "description" in value &&
  typeof value.description === "string" &&
  "updatedAt" in value &&
  value.updatedAt instanceof Date;

export const componentsCatalog: ComponentCatalogItem[] = Object.entries(
  metaModules,
).map(([modulePath, module]) => {
  const pathMatch = modulePath.match(
    /^\.\/components\/(ui|blocks|templates)\/([^/]+)\/meta\.ts$/,
  );
  const meta = Object.values(module).find(isComponentMeta);

  if (!pathMatch || !meta) {
    throw new Error(`컴포넌트 메타데이터를 읽을 수 없습니다: ${modulePath}`);
  }

  const [, category, id] = pathMatch;
  return {
    id,
    name: meta.name,
    category: category as ComponentCategory,
    description: meta.description,
    updatedAt: meta.updatedAt,
    tags: meta.tags,
    aliases: meta.aliases,
    image: meta.image,
    usage: meta.usage,
  };
});
