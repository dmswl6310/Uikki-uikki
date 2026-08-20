import type { RegisteredComponentInfo } from "@/types/component.types";

type ComponentModule = { default: RegisteredComponentInfo };
type ComponentLoader = () => Promise<ComponentModule>;

const componentModules = import.meta.glob<ComponentModule>(
  "./components/*/*/index.ts",
);

const loadersById = Object.entries(componentModules).reduce(
  (loaders, [modulePath, loader]) => {
    const id = modulePath.split("/").at(-2);
    if (id) loaders[id] = loader;
    return loaders;
  },
  {} as Record<string, ComponentLoader>,
);

export const loadComponent = async (
  id: string,
): Promise<RegisteredComponentInfo | undefined> => {
  const loader = loadersById[id];
  if (!loader) return undefined;
  return (await loader()).default;
};
