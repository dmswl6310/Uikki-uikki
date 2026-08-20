import { selectMeta } from "./meta";
import code from "./CustomSelect.tsx?raw";
import codeJs from "./CustomSelect.tsx?jsx-raw";
import { selectExamples } from "./examples";
import { CustomSelect, CustomSelectProps } from "./CustomSelect";
import { ComponentInfo } from "@/types/component.types";

const selectComponent: ComponentInfo<CustomSelectProps> = {
  id: "select",
  Component: CustomSelect,
  ...selectMeta,
  code,
  codeJs,
  examples: selectExamples,
};

export default selectComponent;
