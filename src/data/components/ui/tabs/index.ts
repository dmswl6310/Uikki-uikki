import { tabsMeta } from "./meta";
import code from "./CustomTabs.tsx?raw";
import codeJs from "./CustomTabs.tsx?jsx-raw";
import { tabsExamples } from "./examples";
import { CustomTabs, CustomTabsProps } from "./CustomTabs";
import { ComponentInfo } from "@/types/component.types";

const tabsComponent: ComponentInfo<CustomTabsProps> = {
  id: "tabs",
  Component: CustomTabs,
  ...tabsMeta,
  code,
  codeJs,
  examples: tabsExamples,
};

export default tabsComponent;
