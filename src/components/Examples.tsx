import Example from "./Example";
import type { RegisteredComponentInfo } from "@/types/component.types";

type ExamplesProps = {
  componentInfo: RegisteredComponentInfo;
  examples: Array<Record<string, unknown>>;
};

const Examples = ({ componentInfo, examples }: ExamplesProps) => {
  return (
    <div>
      {examples.map((exampleData, index) => (
        <Example
          key={index}
          componentInfo={componentInfo}
          exampleData={exampleData}
        />
      ))}
    </div>
  );
};

export default Examples;
