import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import Components from "./Components";

const renderPage = () =>
  render(
    <MemoryRouter>
      <Components />
    </MemoryRouter>,
  );

afterEach(cleanup);

describe("Components filters", () => {
  it("merges tags that only differ by letter case", async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole("button", { name: /태그 더보기/ }));

    const tagFilters = screen.getByRole("group", { name: "태그 필터" });
    expect(within(tagFilters).getAllByRole("button", { name: /layout/i })).toHaveLength(1);
  });

  it("exposes selected filters and announces the result count", async () => {
    const user = userEvent.setup();
    renderPage();
    const categoryFilters = screen.getByRole("group", {
      name: "카테고리 필터",
    });
    const blocksButton = within(categoryFilters).getByRole("button", {
      name: /Blocks/,
    });

    expect(blocksButton).toHaveAttribute("aria-pressed", "false");
    await user.click(blocksButton);

    expect(blocksButton).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("status")).toHaveTextContent("개 컴포넌트");
  });

  it("collapses the long tag list until the user asks to see more", async () => {
    const user = userEvent.setup();
    renderPage();
    const expandButton = screen.getByRole("button", { name: /태그 더보기/ });
    const tagFilters = screen.getByRole("group", { name: "태그 필터" });
    const collapsedCount = within(tagFilters).getAllByRole("button").length;

    await user.click(expandButton);

    expect(within(tagFilters).getAllByRole("button").length).toBeGreaterThan(
      collapsedCount,
    );
    expect(screen.getByRole("button", { name: "태그 접기" })).toBeInTheDocument();
  });
});
