import { dropdownMenuMeta } from "./meta";
import code from "./CustomDropdownMenu.tsx?raw";
import codeJs from "./CustomDropdownMenu.tsx?jsx-raw";
import { dropdownMenuExamples } from "./examples";
import {
  CustomDropdownMenu,
  CustomDropdownMenuProps,
} from "./CustomDropdownMenu";
import { ComponentInfo } from "@/types/component.types";

const dropdownMenuComponent: ComponentInfo<CustomDropdownMenuProps> = {
  id: "dropdown-menu",
  Component: CustomDropdownMenu,
  ...dropdownMenuMeta,
  code,
  codeJs,
  examples: dropdownMenuExamples,
};

export default dropdownMenuComponent;
