import { adminDashboardMeta } from "./meta";
import code from "./CustomAdminDashboard.tsx?raw";
import codeJs from "./CustomAdminDashboard.tsx?jsx-raw";
import { adminDashboardExamples } from "./examples";
import {
  CustomAdminDashboard,
  CustomAdminDashboardProps,
} from "./CustomAdminDashboard";
import { ComponentInfo } from "@/types/component.types";

const adminDashboardComponent: ComponentInfo<CustomAdminDashboardProps> = {
  id: "admin-dashboard",
  Component: CustomAdminDashboard,
  ...adminDashboardMeta,
  code,
  codeJs,
  examples: adminDashboardExamples,
};

export default adminDashboardComponent;
