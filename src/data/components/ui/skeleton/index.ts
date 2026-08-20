import { skeletonMeta } from "./meta";
import code from "./CustomSkeleton.tsx?raw";
import codeJs from "./CustomSkeleton.tsx?jsx-raw";
import { skeletonExamples } from "./examples";
import { CustomSkeleton, CustomSkeletonProps } from "./CustomSkeleton";
import { ComponentInfo } from "@/types/component.types";

const skeletonComponent: ComponentInfo<CustomSkeletonProps> = {
  id: "skeleton",
  Component: CustomSkeleton,
  ...skeletonMeta,
  code,
  codeJs,
  examples: skeletonExamples,
};

export default skeletonComponent;
