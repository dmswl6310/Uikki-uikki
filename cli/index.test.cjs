const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const {
  cleanSource,
  getTargetPath,
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
