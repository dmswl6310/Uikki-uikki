import { radioGroupMeta } from "./meta";
import code from "./CustomRadioGroup.tsx?raw";
import codeJs from "./CustomRadioGroup.tsx?jsx-raw";
import { radioGroupExamples } from "./examples";
import { CustomRadioGroup, CustomRadioGroupProps } from "./CustomRadioGroup";
import { ComponentInfo } from "@/types/component.types";

const radioGroupComponent: ComponentInfo<CustomRadioGroupProps> = {
  id: "radio-group",
  Component: CustomRadioGroup,
  ...radioGroupMeta,
  code,
  codeJs,
  examples: radioGroupExamples,
};

export default radioGroupComponent;
