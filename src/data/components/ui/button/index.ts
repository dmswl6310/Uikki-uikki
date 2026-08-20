import { buttonMeta } from "./meta";
import buttonCode from "./CustomButton.tsx?raw";
import buttonCodeJs from "./CustomButton.tsx?jsx-raw";
import { buttonExamples } from "./examples";
import { CustomButton, CustomButtonProps } from "./CustomButton";
import { ComponentInfo } from "@/types/component.types";

const buttonComponent: ComponentInfo<CustomButtonProps> = {
  id: "button",
  Component: CustomButton,
  ...buttonMeta,
  code: buttonCode,
  codeJs: buttonCodeJs,
  examples: buttonExamples,
};

export default buttonComponent;
