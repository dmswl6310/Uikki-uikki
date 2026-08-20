import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the argument (e.g. ui/my-button)
const arg = process.argv[2];

if (!arg) {
  console.error(
    "❌ Error: 컴포넌트 경로를 입력해주세요. (예: npm run generate ui/my-button)",
  );
  process.exit(1);
}

const parts = arg.split("/");
if (parts.length !== 2) {
  console.error(
    "❌ Error: 올바른 형식이 아닙니다. 카테고리/컴포넌트명 형식으로 입력해주세요. (예: ui/my-button)",
  );
  process.exit(1);
}

const [category, kebabName] = parts;

if (!["ui", "blocks", "templates"].includes(category)) {
  console.error(
    "❌ Error: 카테고리는 ui, blocks, templates 중 하나여야 합니다.",
  );
  process.exit(1);
}

if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(kebabName)) {
  console.error(
    "❌ Error: 컴포넌트명은 영문 소문자, 숫자, 하이픈만 사용할 수 있습니다.",
  );
  process.exit(1);
}

// Convert kebab-case to PascalCase and camelCase
const toPascalCase = (str) =>
  str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
const toCamelCase = (str) => {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
};
const toTitleCase = (str) =>
  str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const pascalName = toPascalCase(kebabName); // MyButton
const camelName = toCamelCase(kebabName); // myButton
const titleName = toTitleCase(kebabName); // My Button

const targetDir = path.join(
  __dirname,
  "..",
  "src",
  "data",
  "components",
  category,
  kebabName,
);
const componentsRoot = path.resolve(
  __dirname,
  "..",
  "src",
  "data",
  "components",
);
const resolvedTargetDir = path.resolve(targetDir);

if (!resolvedTargetDir.startsWith(`${componentsRoot}${path.sep}`)) {
  console.error("❌ Error: 허용되지 않은 생성 경로입니다.");
  process.exit(1);
}

if (fs.existsSync(targetDir)) {
  console.error(`❌ Error: 이미 존재하는 컴포넌트입니다. (${targetDir})`);
  process.exit(1);
}

fs.mkdirSync(targetDir, { recursive: true });

// 1. CustomXxx.tsx
const componentContent = `export type Custom${pascalName}Props = {
  text?: string;
};

export const Custom${pascalName} = ({ text = "Hello ${titleName}" }: Custom${pascalName}Props) => {
  return (
    <div className="px-4 py-2 bg-blue-500 text-white rounded-xl shadow-sm text-sm font-medium w-fit">
      {text}
    </div>
  );
};
`;

// 2. meta.ts
const metaContent = `import { PropControl } from "@/types/component.types";
import { Custom${pascalName}Props } from "./Custom${pascalName}";

export const ${camelName}Meta = {
  category: "${category}" as const,
  name: "${titleName}",
  description: "${titleName} 컴포넌트의 설명을 입력하세요.",
  tags: ["${kebabName}"],
  aliases: [],
  updatedAt: new Date("${new Date().toISOString().slice(0, 10)}"),
  propControls: {
    text: { type: "string" as PropControl["type"] },
  } as Partial<Record<keyof Custom${pascalName}Props, PropControl>>,
};
`;

// 3. examples.tsx
const examplesContent = `import { Custom${pascalName}Props } from "./Custom${pascalName}";

export const ${camelName}Examples: Custom${pascalName}Props[] = [
  {
    text: "기본 ${titleName}",
  },
];
`;

// 4. index.ts
const indexContent = `import { ${camelName}Meta } from "./meta";
import code from "./Custom${pascalName}.tsx?raw";
import codeJs from "./Custom${pascalName}.tsx?jsx-raw";
import { ${camelName}Examples } from "./examples";
import { Custom${pascalName}, Custom${pascalName}Props } from "./Custom${pascalName}";
import { ComponentInfo } from "@/types/component.types";

const ${camelName}Component: ComponentInfo<Custom${pascalName}Props> = {
  id: "${kebabName}",
  Component: Custom${pascalName},
  ...${camelName}Meta,
  code,
  codeJs,
  examples: ${camelName}Examples,
};

export default ${camelName}Component;
`;

fs.writeFileSync(
  path.join(targetDir, `Custom${pascalName}.tsx`),
  componentContent,
);
fs.writeFileSync(path.join(targetDir, "meta.ts"), metaContent);
fs.writeFileSync(path.join(targetDir, "examples.tsx"), examplesContent);
fs.writeFileSync(path.join(targetDir, "index.ts"), indexContent);

console.log(
  `✅ 성공적으로 생성되었습니다: src/data/components/${category}/${kebabName}/`,
);
console.log(
  `👉 이제 Custom${pascalName}.tsx 파일을 열어 멋진 컴포넌트를 만들어보세요!`,
);
