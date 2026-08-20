import { tooltipMeta } from "./meta";
import code from "./CustomTooltip.tsx?raw";
import codeJs from "./CustomTooltip.tsx?jsx-raw";
import { tooltipExamples } from "./examples";
import { CustomTooltip, CustomTooltipProps } from "./CustomTooltip";
import { ComponentInfo } from "@/types/component.types";

const tooltipComponent: ComponentInfo<CustomTooltipProps> = {
  id: "tooltip",
  Component: CustomTooltip,
  ...tooltipMeta,
  code,
  codeJs,
  examples: tooltipExamples,
};

export default tooltipComponent;
