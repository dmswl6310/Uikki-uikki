const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const {
  cleanSource,
  getTargetPath,
  installComponent,
  normalizeRequest,
  toPascalCase,
} = require("./index.js");

test("short UI names are normalized", () => {
  assert.deepEqual(normalizeRequest("button"), {
    key: "ui/button",
    category: "ui",
    name: "button",
    dependencies: [],
  });
});

test("blocks expose their component dependencies", () => {
  assert.deepEqual(normalizeRequest("blocks/newsletter-cta").dependencies, [
    "ui/badge",
    "ui/button",
    "ui/input",
  ]);
});

test("composed catalog entries expose all direct dependencies", () => {
  assert.deepEqual(normalizeRequest("blocks/data-table").dependencies, [
    "ui/dropdown-menu",
  ]);
  assert.deepEqual(normalizeRequest("templates/admin-dashboard").dependencies, [
    "ui/badge",
    "ui/dropdown-menu",
    "ui/progress",
    "ui/select",
    "blocks/data-table",
  ]);
});

test("unsafe and unknown paths are rejected", () => {
  assert.throws(() => normalizeRequest("../../secret"));
  assert.throws(() => normalizeRequest("ui/not-supported"));
});

test("component source is renamed and internal imports become consumer paths", () => {
  const source =
    'import { CustomButton } from "@/data/components/ui/button/CustomButton";\nexport const CustomNewsletterCta = () => null;';
  assert.equal(
    cleanSource(source),
    'import { Button } from "../ui/Button";\nexport const NewsletterCta = () => null;',
  );
});

test("block imports in templates become consumer paths", () => {
  const source =
    'import { CustomDataTable } from "@/data/components/blocks/data-table/CustomDataTable";\nexport const CustomAdminDashboard = () => null;';
  assert.equal(
    cleanSource(source),
    'import { DataTable } from "../blocks/DataTable";\nexport const AdminDashboard = () => null;',
  );
});

test("admin dashboard installation writes every required source file", async (t) => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "uikki-cli-"));
  t.after(() => fs.rmSync(cwd, { recursive: true, force: true }));

  await installComponent("templates/admin-dashboard", {
    cwd,
    fetchText: async (url) => {
      const componentName = url.match(/Custom([A-Za-z0-9]+)\.tsx$/)?.[1];
      return `export const Custom${componentName} = () => null;`;
    },
  });

  const expectedFiles = [
    "src/components/ui/Badge.tsx",
    "src/components/ui/DropdownMenu.tsx",
    "src/components/ui/Progress.tsx",
    "src/components/ui/Select.tsx",
    "src/components/blocks/DataTable.tsx",
    "src/components/templates/AdminDashboard.tsx",
  ];
  expectedFiles.forEach((file) =>
    assert.equal(fs.existsSync(path.join(cwd, file)), true, file),
  );
});

test("target files stay under src/components", () => {
  const cwd = path.resolve("fixture-project");
  const entry = normalizeRequest("tabs");
  const { targetPath } = getTargetPath(cwd, entry);
  assert.equal(
    targetPath,
    path.resolve(cwd, "src", "components", "ui", "Tabs.tsx"),
  );
  assert.equal(toPascalCase("newsletter-cta"), "NewsletterCta");
});
