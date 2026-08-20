import { checkboxMeta } from "./meta";
import code from "./CustomCheckbox.tsx?raw";
import codeJs from "./CustomCheckbox.tsx?jsx-raw";
import { checkboxExamples } from "./examples";
import { CustomCheckbox, CustomCheckboxProps } from "./CustomCheckbox";
import { ComponentInfo } from "@/types/component.types";

const checkboxComponent: ComponentInfo<CustomCheckboxProps> = {
  id: "checkbox",
  Component: CustomCheckbox,
  ...checkboxMeta,
  code,
  codeJs,
  examples: checkboxExamples,
};

export default checkboxComponent;
