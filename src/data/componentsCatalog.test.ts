import { describe, expect, it } from "vitest";
import { loadComponent } from "./componentLoaders";
import { componentsCatalog } from "./componentsCatalog";

describe("component catalog", () => {
  it("keeps a lightweight and unique entry for every registered component", () => {
    const ids = componentsCatalog.map((component) => component.id);

    expect(componentsCatalog).toHaveLength(23);
    expect(new Set(ids).size).toBe(ids.length);
    expect(
      componentsCatalog.filter((component) => component.category === "ui"),
    ).toHaveLength(19);
    expect(
      componentsCatalog.filter((component) => component.category === "blocks"),
    ).toHaveLength(2);
    expect(
      componentsCatalog.filter(
        (component) => component.category === "templates",
      ),
    ).toHaveLength(2);
    expect(componentsCatalog[0]).not.toHaveProperty("Component");
    expect(componentsCatalog[0]).not.toHaveProperty("examples");
    expect(componentsCatalog[0]).not.toHaveProperty("code");
  });

  it("loads full component details only when requested", async () => {
    const detail = await loadComponent("button");

    expect(detail?.id).toBe("button");
    expect(detail?.Component).toBeTypeOf("function");
    expect(detail?.examples.length).toBeGreaterThan(0);
    expect(detail?.code).toContain("CustomButton");
    await expect(loadComponent("not-registered")).resolves.toBeUndefined();
  });
});
