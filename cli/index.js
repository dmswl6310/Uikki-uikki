#!/usr/bin/env node

const https = require("https");
const fs = require("fs");
const path = require("path");
const packageJson = require("./package.json");

const SOURCE_BASE =
  "https://raw.githubusercontent.com/dmswl6310/Uikki-uikki/main/src/data/components";

const REGISTRY = {
  "ui/accordion": { category: "ui", name: "accordion", dependencies: [] },
  "ui/avatar": { category: "ui", name: "avatar", dependencies: [] },
  "ui/badge": { category: "ui", name: "badge", dependencies: [] },
  "ui/button": { category: "ui", name: "button", dependencies: [] },
  "ui/card": { category: "ui", name: "card", dependencies: [] },
  "ui/drawer": { category: "ui", name: "drawer", dependencies: [] },
  "ui/input": { category: "ui", name: "input", dependencies: [] },
  "ui/list": { category: "ui", name: "list", dependencies: [] },
  "ui/modal": { category: "ui", name: "modal", dependencies: [] },
  "ui/progress": { category: "ui", name: "progress", dependencies: [] },
  "ui/tabs": { category: "ui", name: "tabs", dependencies: [] },
  "ui/toast": { category: "ui", name: "toast", dependencies: [] },
  "ui/toggle": { category: "ui", name: "toggle", dependencies: [] },
  "ui/tooltip": { category: "ui", name: "tooltip", dependencies: [] },
  "blocks/newsletter-cta": {
    category: "blocks",
    name: "newsletter-cta",
    dependencies: ["ui/badge", "ui/button", "ui/input"],
  },
  "templates/checkout-page": {
    category: "templates",
    name: "checkout-page",
    dependencies: ["ui/avatar", "ui/badge", "ui/button", "ui/input"],
  },
};

const toPascalCase = (value) =>
  value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

const normalizeRequest = (rawPath) => {
  if (
    typeof rawPath !== "string" ||
    !/^(?:(ui|blocks|templates)\/)?[a-z0-9]+(?:-[a-z0-9]+)*$/.test(rawPath)
  ) {
    throw new Error(
      "컴포넌트 이름은 영문 소문자·숫자·하이픈과 허용된 카테고리만 사용할 수 있습니다.",
    );
  }

  const key = rawPath.includes("/") ? rawPath : `ui/${rawPath}`;
  const entry = REGISTRY[key];
  if (!entry) {
    throw new Error(
      `지원하지 않는 컴포넌트입니다: ${rawPath}. 'npx uikki list'로 목록을 확인하세요.`,
    );
  }

  return { key, ...entry };
};

const getTargetPath = (cwd, entry) => {
  const componentsRoot = path.resolve(cwd, "src", "components");
  const targetDir = path.resolve(componentsRoot, entry.category);
  const targetPath = path.resolve(targetDir, `${toPascalCase(entry.name)}.tsx`);

  if (!targetPath.startsWith(`${componentsRoot}${path.sep}`)) {
    throw new Error("허용되지 않은 출력 경로입니다.");
  }

  return { targetDir, targetPath };
};

const cleanSource = (source) =>
  source
    .replace(
      /@\/data\/components\/ui\/([a-z0-9-]+)\/Custom([A-Za-z0-9]+)/g,
      (_, componentName, importedName) =>
        `../ui/${importedName || toPascalCase(componentName)}`,
    )
    .replace(/\bCustom([A-Z][A-Za-z0-9]*)/g, "$1");

const requestText = (url, redirects = 0) =>
  new Promise((resolve, reject) => {
    const request = https.get(
      url,
      { headers: { "User-Agent": `uikki/${packageJson.version}` } },
      (response) => {
        if (
          response.statusCode >= 300 &&
          response.statusCode < 400 &&
          response.headers.location &&
          redirects < 3
        ) {
          response.resume();
          resolve(
            requestText(
              new URL(response.headers.location, url).toString(),
              redirects + 1,
            ),
          );
          return;
        }

        if (response.statusCode !== 200) {
          response.resume();
          reject(
            new Error(
              `원본 다운로드에 실패했습니다. HTTP ${response.statusCode}`,
            ),
          );
          return;
        }

        response.setEncoding("utf8");
        let data = "";
        response.on("data", (chunk) => {
          data += chunk;
        });
        response.on("end", () => resolve(data));
      },
    );

    request.setTimeout(15_000, () =>
      request.destroy(new Error("다운로드 시간이 초과되었습니다.")),
    );
    request.on("error", reject);
  });

const installEntry = async (entry, options) => {
  const { cwd, force, allowExisting, fetchText } = options;
  const { targetDir, targetPath } = getTargetPath(cwd, entry);

  if (fs.existsSync(targetPath) && !force) {
    if (allowExisting) {
      console.log(
        `↪ 이미 설치되어 있어 건너뜁니다: ${path.relative(cwd, targetPath)}`,
      );
      return targetPath;
    }
    throw new Error(
      `이미 파일이 존재합니다: ${path.relative(cwd, targetPath)}. 덮어쓰려면 --force를 사용하세요.`,
    );
  }

  const pascalName = toPascalCase(entry.name);
  const sourceUrl = `${SOURCE_BASE}/${entry.category}/${entry.name}/Custom${pascalName}.tsx`;
  console.log(`⬇️  ${entry.category}/${entry.name} 다운로드 중...`);
  const source = await fetchText(sourceUrl);

  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(targetPath, cleanSource(source), {
    encoding: "utf8",
    flag: force ? "w" : "wx",
  });
  console.log(`✅ ${path.relative(cwd, targetPath)}`);
  return targetPath;
};

const installComponent = async (rawPath, options = {}) => {
  const entry = normalizeRequest(rawPath);
  const installOptions = {
    cwd: options.cwd || process.cwd(),
    force: options.force === true,
    fetchText: options.fetchText || requestText,
  };

  for (const dependencyKey of entry.dependencies) {
    await installEntry(REGISTRY[dependencyKey], {
      ...installOptions,
      allowExisting: true,
    });
  }

  return installEntry(entry, { ...installOptions, allowExisting: false });
};

const printHelp = () => {
  console.log(`
Uikki CLI ${packageJson.version}

사용법:
  npx -y uikki add <component> [--force]
  npx -y uikki list
  npx -y uikki --version

예시:
  npx -y uikki add button
  npx -y uikki add blocks/newsletter-cta
`);
};

const printList = () => {
  const groups = ["ui", "blocks", "templates"];
  for (const category of groups) {
    console.log(`\n${category}`);
    Object.keys(REGISTRY)
      .filter((key) => key.startsWith(`${category}/`))
      .forEach((key) => console.log(`  - ${key}`));
  }
};

const run = async (args = process.argv.slice(2)) => {
  const [command, value] = args;

  if (
    !command ||
    command === "help" ||
    command === "--help" ||
    command === "-h"
  ) {
    printHelp();
    return;
  }
  if (command === "--version" || command === "-v") {
    console.log(packageJson.version);
    return;
  }
  if (command === "list") {
    printList();
    return;
  }
  if (command !== "add" || !value) {
    throw new Error(
      "사용법: npx -y uikki add <component>. 자세한 도움말은 --help를 사용하세요.",
    );
  }

  await installComponent(value, { force: args.includes("--force") });
};

if (require.main === module) {
  run().catch((error) => {
    console.error(`❌ ${error.message}`);
    process.exitCode = 1;
  });
}

module.exports = {
  REGISTRY,
  cleanSource,
  getTargetPath,
  installComponent,
  normalizeRequest,
  requestText,
  run,
  toPascalCase,
};
